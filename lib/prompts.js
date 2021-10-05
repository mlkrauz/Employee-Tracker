import inquirer from 'inquirer'
import cTable from 'console.table'
import { allDepartments } from './departments.js'
import { allRoles as _allRoles } from './roles.js'
import { allEmployees as _allEmployees } from './employees.js'

export async function mainPrompt() {
    try {
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
    
        const answer = (await inquirer.prompt([mainQuestion, mainQuestion]))
    
        switch (answer.mainQuestion) {
            case 'View all departments':
                viewDepartments()
                break
            case 'View all roles':
                viewRoles()
                break
            case 'View all employees':
                viewEmployees()
                break
            case 'Add a new department':
                addDepartment()
                break
            case 'Add a new role':
                addRole()
                break
            case 'Add a new employee':
                addEmployee()
                break
            case 'Update employee role and manager':
                updateEmployee()
                break
            case 'Exit':
                console.log('Employee-Tracker complete.')
                break
        }

    } catch (err) {
        console.log(err)
    }
}

async function viewDepartments() {
    const allDepts = allDepartments()
    console.table(allDepts)
    await mainPrompt()
}

async function viewRoles() {
    const allRoles = _allRoles()
    console.table(allRoles)
    await mainPrompt()
}

async function viewEmployees() {
    const allEmployees = _allEmployees()
    console.table(allEmployees)
    await mainPrompt()
}

async function addDepartment() {
    
    await mainPrompt()
}

async function addRole() {
    
    await mainPrompt()
}

async function addEmployee() {
    
    await mainPrompt()
}

async function updateEmployee() {
    
    await mainPrompt()
}