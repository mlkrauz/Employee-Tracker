const inquirer = require('inquirer')
const cTable = require('console.table')
const {} = require('../lib/departments')
const {} = require('../lib/roles')
const {} = require('../lib/employees')

/**
 * @returns the handler to start the Employee-Tracker.
 */
function prompt() {

    async function mainPrompt() {

        const mainQuestion = {
            type: 'list',
            message: 'Please select an action.',
            choices: mainChoices,
            name: 'main',
            pageSize: mainChoices.length(),
            loop: false
        }
        
        const mainChoices = ['View all departments', 'View all roles', 'View all employees', 'Add a new department',
        'Add a new role', 'Add a new employee', 'Update employee role and manager', 'Exit']

        const answer = await inquirer.prompt(mainQuestion)

        switch (answer.main) {
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
    }

    async function viewDepartments() {

    }

    async function viewRoles() {
        
    }

    async function viewEmployees() {
        
    }

    async function addDepartment() {
        
    }

    async function addRole() {
        
    }

    async function addEmployee() {
        
    }

    async function updateEmployee() {
        
    }

    return {
        /**
         * Starts the Employee-Tracker.
         */
        start: () => {
            // Start main prompt
            mainPrompt()
        }
    }
}

module.exports = prompt()