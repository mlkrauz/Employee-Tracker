import { db } from '../config/connection.js'
import { validateString, validateInteger } from './helpers/typeValidation.js'

/**
 * @returns whether or not the passed in department name is valid.
 */
export const deptNameExists = async (deptName) => {
    validateString(deptName)
    
    const result = await db.promise().query(`SELECT CASE WHEN EXISTS (SELECT * FROM department WHERE name = "${deptName}") THEN 'true' ELSE 'false' END`)
    const finalResult = Object.values(JSON.parse(JSON.stringify(result))[0][0])[0]

    if (finalResult === 'true') {
        return true
    } else if (finalResult === 'false') {
        return false
    } else {
        throw new Error("??? 'result' should be 'true' or 'false' ??? how did this error get thrown ???")
    }
}

/**
 * @returns whether or not the passed in department ID is valid.
 */
export const deptIDExists = async (deptID) => {
    validateInteger(deptID)
    const result = await db.promise().query(`SELECT CASE WHEN EXISTS (SELECT * FROM department WHERE id = ${deptID}) THEN 'true' ELSE 'false' END`)
    const finalResult = Object.values(JSON.parse(JSON.stringify(result))[0][0])[0]

    if (finalResult === 'true') {
        return true
    } else if (finalResult === 'false') {
        return false
    } else {
        throw new Error("??? 'result' should be 'true' or 'false' ??? how did this error get thrown ???")
    }
}

/**
 * @returns an array of all department objects
 */
export const allDepartments = async () => {
    return await db.promise().query('SELECT * FROM department')
}

/**
 * Adds a new department to the department table.
 * @param {String} deptName the name of the department.
 */
export const addDepartment = async (deptName) => {
    validateString(deptName)
    await db.promise().execute(`INSERT INTO department (name) VALUES ("${deptName}")`)
}

/**
 * @param {String} deptName the name of the department.
 * @returns the department ID.
 */
export const getIDbyName = async (deptName) => {
    if (deptNameExists(deptName)) {
        const result = await db.promise().query(`SELECT id FROM department WHERE name = "${deptName}"`)
        const finalResult = Object.values(JSON.parse(JSON.stringify(result))[0][0])[0]
        
        return finalResult
    } else {
        throw new Error('No department exists with that name.')
    }
}

/**
 * @param {String} deptID the ID of the department.
 * @returns the department name.
 */
export const getNamebyID = async (deptID) => {
    if (deptIDExists(deptID)) {
        const result = await db.promise().query(`SELECT name FROM department WHERE id = ${deptID}`)
        const finalResult = Object.values(JSON.parse(JSON.stringify(result))[0][0])[0]
        
        return finalResult
    } else {
        throw new Error('No department exists with that ID.')
    }
}