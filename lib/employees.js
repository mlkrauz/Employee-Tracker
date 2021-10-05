import { db } from '../config/connection.js'
import { validateString, validateInteger } from './helpers/typeValidation.js'

/**
 * @returns whether or not the passed in employee names are valid.
 */
export const employeeNameExists = async (employeeName_first, employeeName_last) => {
    validateString(employeeName_first)
    validateString(employeeName_last)
    const result = await db.query(
        `SELECT CASE WHEN EXISTS (SELECT * FROM employee WHERE first_name = (?) AND last_name = (?)) THEN 'true' ELSE 'false' END`,
        [employeeName_first, employeeName_last]
    )
    if (result === 'true') {
        return true
    } else if (result === 'false') {
        return false
    } else {
        throw new Error("??? 'result' should be 'true' or 'false' ??? how did this error get thrown ???")
    }
}

/**
 * @returns whether or not the passed in role ID is valid.
 */
export const employeeIdExists = async (employeeId) => {
    validateInteger(employeeId)
    const result = await db.query(
        `SELECT CASE WHEN EXISTS (SELECT * FROM employee WHERE id = (?)) THEN 'true' ELSE 'false' END`,
        [employeeID]
    )
    
    if (result === 'true') {
        return true
    } else if (result === 'false') {
        return false
    } else {
        throw new Error("??? 'result' should be 'true' or 'false' ??? how did this error get thrown ???")
    }
}

/**
 * @returns an array of all employee objects.
 */
export const allEmployees = async () => {
    return await db.query('SELECT * FROM employee')
}

/**
 * @returns an array of all employees whom are managers.
 */
export const allManagers = async () => {
    return await db.query('SELECT * FROM employee WHERE isManager = 1')
}

/**
 * @param {Number} deptId the Id of the department to search.
 * @returns an array of all employees under a specific department.
 */
export const employeesByDepartment = async (deptId) => {
    validateInteger(deptId)
    return await db.query(
        'SELECT * FROM employee WHERE role_id IN (SELECT role_id FROM role WHERE department_id = (?))',
        [deptId]
    )
}

/**
 * @param {Number} managerId the Id of the manager to search.
 * @returns an array of all employees under a specific manager.
 */
export const employeesByManager = async (managerId) => {
    validateInteger(managerId)
    return await db.query(
        'SELECT * FROM employee WHERE manager_id = (?)',
        [managerId]
    )
}

/**
 * Adds a new employee to the employee table.
 * @param {String} employeeName_first the first name of the new Employee
 * @param {String} employeeName_last the last name of the new Employee
 * @param {Number} roleId the role id of the new Employee
 * @param {Number} managerId the manager id of the new Employee
 */
export const addEmployee = async (employeeName_first, employeeName_last, roleId, managerId) => {
    employeeNameExists(employeeName_first, employeeName_last)
    // The role id and manager id can be null, so we will not check for validity.
    // god I just want to start using typescript to avoid this mess.
    await db.execute(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [employeeName_first, employeeName_last, roleId, managerId]
    )
}

/**
 * Changes the role_id of a specified employee.
 * @param {Number} employeeId the id of the employee whose role we are updating.
 * @param {Number} newRoleId the new role id to overwrite the old one.
 */
export const changeEmployeeRole = async (employeeId, newRoleId) => {
    employeeIdExists(employeeId)
    // role id can be null, so we will not check for validity.
    await db.execute(
        'UPDATE employee SET role_id = (?) WHERE id = (?)',
        [newRoleId, employeeId]
    )
}

/**
 * Changes the role_id of a specified employee.
 * @param {Number} employeeId the id of the employee whose role we are updating.
 * @param {Number} newManagerId the new manager id to overwrite the old one.
 */
export const changeEmployeeManager = async (employeeId, newManagerId) => {
    employeeIdExists(employeeId)
    // manager id can be null, so we will not check for validity.
    await db.execute(
        'UPDATE employee SET manager_id = (?) WHERE id = (?)',
        [newManagerId, employeeId]
    )
}

/**
 * @param {String} employeeName_first first name of the employee.
 * @param {String} employeeName_last last name of the employee.
 * @returns the employee id.
 */
export const getIDbyName = async (employeeName_first, employeeName_last) => {
    if (employeeNameExists(employeeName_first, employeeName_last)) {
        return await db.query(
            'SELECT id FROM employee WHERE first_name = (?) AND last_name = (?)',
            [employeeName_first, employeeName_last]
        )
    } else {
        throw new Error('No employee exists with that name.')
    }
}

/**
 * @param {Number} employeeId the employee id of the employee.
 * @returns the first and last name of the employee.
 */
export const getNamebyID = async (employeeId) => {
    if (employeeIdExists(employeeId)) {
        return await db.query(
            'SELECT first_name, last_name FROM employee WHERE id = (?)',
            [employeeId]
        )
    } else {
        throw new Error('No employee exists with that Id.')
    }
}