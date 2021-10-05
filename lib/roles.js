import { db } from '../config/connection.js'
import { validateString, validateInteger, validateBoolean, validateBit } from './helpers/typeValidation.js'
import { booleanToBit, bitToBoolean } from './helpers/booleanAndBitConversion.js'

/**
 * @returns whether or not the passed in role title is valid.
 */
export const roleTitleExists = async (roleTitle) => {
    validateString(roleTitle)
    
    const result = await db.query(`SELECT CASE WHEN EXISTS (SELECT * FROM role WHERE title = "${roleTitle}") THEN 'true' ELSE 'false' END`)
    
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
export const roleIdExists = async (roleID) => {
    validateInteger(roleID)
    const result = await db.query(`SELECT CASE WHEN EXISTS (SELECT * FROM role WHERE id = ${roleID}) THEN 'true' ELSE 'false' END`)
    
    if (result === 'true') {
        return true
    } else if (result === 'false') {
        return false
    } else {
        throw new Error("??? 'result' should be 'true' or 'false' ??? how did this error get thrown ???")
    }
}

/**
 * @returns an array of all role objects
 */
export const allRoles = async () => {
    return await db.query('SELECT * FROM role')
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
    await db.execute(`INSERT INTO role (title, salary, isManager) VALUES (?, ?, ?, ?)`, [roleTitle, salary, bit, departmentId])
}

/**
 * @param {String} roleTitle the title of the role.
 * @returns the role ID.
 */
export const getIDbyTitle = async (roleTitle) => {
    if (roleTitleExists(roleTitle)) {
        return await db.query(`SELECT id FROM role WHERE title = "${roleTitle}"`)
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
        return await db.query(`SELECT title FROM role WHERE id = ${roleID}`)
    } else {
        throw new Error('No role exists with that ID.')
    }
}