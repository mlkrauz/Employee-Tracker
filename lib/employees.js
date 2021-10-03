const db = require('../config/connection')

function employees() {

    isValidEmployeeName = (employeeName) => {

    }

    isValidEmployeeID = (employeeID) => {
        
    }

    return {
        allEmployees: () => {

        },

        allManagers: () => {

        },

        employeesByDepartment: (deptID) => {

        },

        employeesByManager: (managerID) => {
            
        },

        addEmployee: (employeeName_first, employeeName_last, roleId, managerId) => {

        },

        changeEmployeeRole: (employeeID, newRoleName) => {

        },

        changeEmployeeManager: (employeeID, newManagerID) => {

        },

        getIDbyName: (employeeName) => {

        },

        getNamebyID: (employeeID) => {

        }
    }
}

module.exports = employees()