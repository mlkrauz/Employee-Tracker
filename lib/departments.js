const db = require('../config/connection')
const { validateString, validateInteger} = require('./helpers/typeValidation')

/**
 * @returns department handler functions
 */
function departments() {

    /**
     * @returns whether or not the passed in department name is valid.
     */
    deptNameExists = async (deptName) => {
        validateString(deptName)
        
        const result = await db.query(`SELECT CASE WHEN EXISTS (SELECT * FROM department WHERE name = "${deptName}") THEN 'true' ELSE 'false' END`)
        
        if (result === 'true') {
            return true
        } else if (result === 'false') {
            return false
        } else {
            throw new Error("??? 'result' should be 'true' or 'false' ??? how did this error get thrown ???")
        }
    }

    /**
     * @returns whether or not the passed in department ID is valid.
     */
    deptIDExists = (deptID) => {
        validateInteger(deptID)

        const result = await db.query(`SELECT CASE WHEN EXISTS (SELECT * FROM department WHERE id = ${deptID}) THEN 'true' ELSE 'false' END`)
        
        if (result === 'true') {
            return true
        } else if (result === 'false') {
            return false
        } else {
            throw new Error("??? 'result' should be 'true' or 'false' ??? how did this error get thrown ???")
        }
    }

    return {
        /**
         * @returns an array of all department objects
         */
        allDepartments: async () => {
            return await db.query('SELECT * FROM department')
        },

        /**
         * Adds a new department to the department table.
         * @param {String} deptName the name of the department.
         */
        addDepartment: async (deptName) => {
            validateString(deptName)
            await db.execute(`INSERT INTO department (name) VALUES ("${deptName}")`)
        },

        /**
         * @param {String} deptName the name of the department.
         * @returns the department ID.
         */
        getIDbyName: async (deptName) => {
            if (deptNameExists(deptName)) {
                return await db.query(`SELECT id FROM department WHERE name = "${deptName}"`)
            } else {
                throw new Error('No department exists with that name.')
            }
        },

        /**
         * @param {String} deptID the ID of the department.
         * @returns the department name.
         */
        getNamebyID: (deptID) => {
            if (deptIDExists(deptID)) {
                return await db.query(`SELECT name FROM department WHERE id = ${deptID}`)
            } else {
                throw new Error('No department exists with that ID.')
            }
        }
    }
}

module.exports = departments()