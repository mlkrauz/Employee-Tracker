import { db } from '../config/connection.js'
import { validateString, validateInteger, validateBoolean, validateBit } from './helpers/typeValidation.js'
import { booleanToBit, bitToBoolean } from './helpers/booleanAndBitConversion.js'

/**
 * @returns whether or not the passed in role title is valid.
 */
export const roleTitleExists = async (roleTitle) => {
    validateString(roleTitle)
    
    const result = await db.promise().query(`SELECT CASE WHEN EXISTS (SELECT * FROM role WHERE title = "${roleTitle}") THEN 'true' ELSE 'false' END`)
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
 * @returns whether or not the passed in role ID is valid.
 */
export const roleIdExists = async (roleID) => {
    validateInteger(roleID)

    const result = await db.promise().query(`SELECT CASE WHEN EXISTS (SELECT * FROM role WHERE id = ${roleID}) THEN 'true' ELSE 'false' END`)
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
 * @returns an array of all role objects
 */
export const allRoles = async () => {
    return await db.promise().query(`SELECT role.id, role.title, department.name, role.salary FROM role
    INNER JOIN department ON department.id = role.department_id`)
}

/**
 * Adds a new role to the role table.
 * @param {String} roleTitle the title of the new role.
 * @param {Number} salary the salary of the new role.
 * @param {Boolean} isManager whether or not the new role is management.
 */
export const addRole = async (roleTitle, salary, isManager, departmentId) => {
    validateString(roleTitle)
    validateInteger(salary)
    validateBoolean(isManager)
    validateInteger(departmentId)
    const bit = booleanToBit(isManager)
    await db.promise().execute(`INSERT INTO role (title, salary, isManager, department_id) VALUES (?, ?, ?, ?)`, [roleTitle, salary, bit, departmentId])
}

/**
 * @param {String} roleTitle the title of the role.
 * @returns the role ID.
 */
export const getIDbyTitle = async (roleTitle) => {
    if (roleTitleExists(roleTitle)) {
        const result = await db.promise().query(`SELECT id FROM role WHERE title = "${roleTitle}"`)
        const finalResult = Object.values(JSON.parse(JSON.stringify(result))[0][0])[0]
        
        return finalResult
    } else {
        throw new Error('No role exists with that title.')
    }
}

/**
 * @param {String} roleID the ID of the role.
 * @returns the role title.
 */
export const getTitlebyID = async (roleID) => {
    if (roleIdExists(roleID)) {
        const result = await db.promise().query(`SELECT title FROM role WHERE id = ${roleID}`)
        const finalResult = Object.values(JSON.parse(JSON.stringify(result))[0][0])[0]
        
        return finalResult
    } else {
        throw new Error('No role exists with that ID.')
    }
}