import inquirer from 'inquirer'
import cTable from 'console.table'
import * as departments from './departments.js'
import * as roles from './roles.js'
import * as employees from './employees.js'

/**
 * This runs the 'main menu' of the inquirer prompt cycle.
 */
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
            process.exit() // Exit and return control to the CLI.
            break
    }
}

/**
 * Displays all departments in the CLI, then returns to the main menu.
 */
async function viewDepartments() {
    const allDepts = await departments.allDepartments()
    console.log() //Blank line
    console.table(allDepts[0])
    await mainPrompt()
}

/**
 * Displays all roles in the CLI, then returns to the main menu.
 */
async function viewRoles() {
    const allRoles = await roles.allRoles()
    console.log() //Blank line
    console.table(allRoles[0])
    await mainPrompt()
}

/**
 * Displays all employees in the CLI, then returns to the main menu.
 */
async function viewEmployees() {
    const allEmployees = await employees.allEmployees()
    console.log() //Blank line
    console.table(allEmployees[0])
    await mainPrompt()
}

/**
 * Prompts the user for sufficient data to add a new department, then returns to the main menu.
 */
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

/**
 * Prompts the user for sufficient data to add a new role, then returns to the main menu.
 */
async function addRole() {
    // Get all departments and format them into department choices.
    const allDepts = await departments.allDepartments()
    const deptChoices = allDepts[0].map(dept => dept.name)
    
    // Prompt and recieve answers.
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
    console.log('Role added!\n')

    await mainPrompt()
}

/**
 * Prompts the user for sufficient data to add a new employee, then returns to the main menu.
 */
async function addEmployee() {
    // Get roles and format them into role choices.
    const allRoles = await roles.allRoles()
    const roleChoices = await  Promise.all(
        allRoles[0].map(async role => {
            const roleId = await roles.getIDbyTitle(role.title)

            return {
                name: `${role.title} (${role.name})`, //role.name is the department.name of the role.
                value: roleId
            }
        }) 
    )

    // Get managers and format them into manager choices.
    const allManagers = await employees.allManagers()
    const managerChoices = await Promise.all(
        allManagers[0].map(async manager => {
            const managerId = await employees.getIDbyName(manager.first_name, manager.last_name)
        
            return {
                name: `${manager.first_name} ${manager.last_name} (${manager.name})`, //manager.name is the department.name of the manager.
                value: managerId
            }
        })
    )
    // We need an option for no manager.
    managerChoices.push(
        {
            name: `No manager`,
            value: null
        }
    )

    // Prompt and recieve answers.
    const answers = await inquirer.prompt([
        {
            message: 'What is the first name of the new employee?',
            name: 'first_name'
        },
        {
            message: 'What is the last name of the new employee?',
            name: 'last_name'
        },
        {
            type: 'list',
            message: `What is the new employee's role?`,
            choices: roleChoices,
            name: 'role',
            pageSize: roleChoices.length,
            loop: false
        },
        {
            type: 'list',
            message: `Who is the new employee's manager?`,
            choices: managerChoices,
            name: 'manager',
            pageSize: managerChoices.length,
            loop: false
        }
    ])

    // Create the new employee.
    await employees.addEmployee(answers.first_name, answers.last_name, answers.role, answers.manager)
    console.log('Employee added!\n')

    await mainPrompt()
}

/**
 * Prompts the user for sufficient data to update an existing employee, then returns to the main menu.
 */
async function updateEmployee() {
    // Get all employees and format them into employee choices
    const allEmployees = await employees.allEmployees()
    const employeeChoices = await Promise.all(
        allEmployees[0].map(async employee => {
            const employeeID = await employees.getIDbyName(employee.first_name, employee.last_name)

            return {
                name: `${employee.first_name} ${employee.last_name} (${employee.name} - ${employee.title})`,
                value: employeeID
            }
        })
    )
    
    // Get roles and format them into role choices.
    const allRoles = await roles.allRoles()
    const roleChoices = await  Promise.all(
        allRoles[0].map(async role => {
            const roleId = await roles.getIDbyTitle(role.title)

            return {
                name: `${role.title} (${role.name})`, //role.name is the department.name of the role.
                value: roleId
            }
        }) 
    )

    // Get managers and format them into manager choices.
    const allManagers = await employees.allManagers()
    const managerChoices = await Promise.all(
        allManagers[0].map(async manager => {
            const managerId = await employees.getIDbyName(manager.first_name, manager.last_name)
        
            return {
                name: `${manager.first_name} ${manager.last_name} (${manager.name})`, //manager.name is the department.name of the manager.
                value: managerId
            }
        })
    )
    // We need an option for no manager.
    managerChoices.push(
        {
            name: `No manager`,
            value: null
        }
    )

    // Prompt and recieve answers.
    const answers = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee do you want to update the role/manager of?',
            choices: employeeChoices,
            name: 'employee',
            pageSize: employeeChoices.length,
            loop: false
        },
        {
            type: 'list',
            message: `What is the new employee's new role?`,
            choices: roleChoices,
            name: 'role',
            pageSize: roleChoices.length,
            loop: false
        },
        {
            type: 'list',
            message: `Who is the new employee's new manager?`,
            choices: managerChoices,
            name: 'manager',
            pageSize: managerChoices.length,
            loop: false
        }
    ])

    // Update employee
    await employees.changeEmployeeRole(answers.employee, answers.role)
    await employees.changeEmployeeManager(answers.employee, answers.manager)
    console.log('Employee updated!\n')

    await mainPrompt()
}