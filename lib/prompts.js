import inquirer from 'inquirer'
import cTable from 'console.table'
import * as departments from './departments.js'
import * as roles from './roles.js'
import * as employees from './employees.js'

export async function mainPrompt() {
        
    const mainChoices = ['View all departments', 'View all roles', 'View all employees', 'Add a new department',
        'Add a new role', 'Add a new employee', 'Update employee role and manager', 'Exit']
    
    const mainQuestion = {
        type: 'list',
        message: 'Please select an action.',
        choices: mainChoices,
        name: 'mainQuestion',
        pageSize: mainChoices.length,
        loop: false
    }

    const answer = await inquirer.prompt([mainQuestion])

    switch (answer.mainQuestion) {
        case 'View all departments':
            await viewDepartments()
            break
        case 'View all roles':
            await viewRoles()
            break
        case 'View all employees':
            await viewEmployees()
            break
        case 'Add a new department':
            await addDepartment()
            break
        case 'Add a new role':
            await addRole()
            break
        case 'Add a new employee':
            await addEmployee()
            break
        case 'Update employee role and manager':
            await updateEmployee()
            break
        case 'Exit':
            console.log('Employee-Tracker complete.')
            break
    }
}

async function viewDepartments() {
    const allDepts = await departments.allDepartments()
    console.log() //Blank line
    console.table(allDepts[0])
    await mainPrompt()
}

async function viewRoles() {
    const allRoles = await roles.allRoles()
    console.log() //Blank line
    console.table(allRoles[0])
    await mainPrompt()
}

async function viewEmployees() {
    const allEmployees = await employees.allEmployees()
    console.log() //Blank line
    console.table(allEmployees[0])
    await mainPrompt()
}

async function addDepartment() {
    const answers = await inquirer.prompt([
        {
            message: 'What is the name of the department to add?',
            name: 'departmentName'
        }
    ])

    await departments.addDepartment(answers.departmentName)
    console.log('Department Added!\n')

    await mainPrompt()
}

async function addRole() {
    const allDepts = await departments.allDepartments()
    const deptChoices = allDepts[0].map(dept => dept.name)
    
    const answers = await inquirer.prompt([
        {
            message: 'What is the name of the role to add?',
            name: 'name'
        },
        {
            message: 'What is the salary of the new role?',
            name: 'salary'
        },
        {
            type: 'confirm',
            message: 'Is the new role a managerial position?',
            name: 'isManager'
        },
        {
            type: 'list',
            message: 'Which department does this role belong to?',
            choices: deptChoices,
            name: 'deptName',
            pageSize: deptChoices.length,
            loop: false
        }
    ])

    const deptId = await departments.getIDbyName(answers.deptName)
    
    await roles.addRole(answers.name, Number(answers.salary), answers.isManager, deptId)
    console.log('Role added!')

    await mainPrompt()
}

async function addEmployee() {
    
    await mainPrompt()
}

async function updateEmployee() {
    
    await mainPrompt()
}