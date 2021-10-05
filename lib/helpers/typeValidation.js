/**
 * Checks if variable is a valid String. Throws appropriate error if not.
 * @param {Any} variable variable to be validated.
 */
export const validateString = (variable) => {
    if (!variable) {
        throw new Error(`TypeError: Variable is not defined. It must be a String.`)
    }
    
    if (typeof variable !== 'string') {
        throw new Error(`TypeError: Variable must be a String. It is instead a ${typeof variable}. variable: ${variable}`)
    }
}

/**
 * Checks if variable is a valid Integer. Throws appropriate error if not.
 * @param {Any} variable variable to be validated.
 */
export const validateInteger = (variable) => {
    if (!variable) {
        throw new Error(`TypeError: Variable is not defined. It must be a number which is an Integer.`)
    }
    if (typeof variable !== 'number') {
        throw new Error(`TypeError: Variable must be a Number which is an Integer. It is instead a ${typeof variable}. variable: ${variable}`)
    }
    
    if (!Number.isInteger(variable)) {
        throw new Error(`Variable must be an Integer. Current value is ${variable}.`)
    }
}

/**
 * Checks if variable is a valid Boolean. Throws appropriate error if not.
 * @param {Any} variable variable to be validated.
 */
export const validateBoolean = (variable) => {
    if (!variable) {
        throw new Error(`TypeError: Variable is not defined. It must be a Boolean.`)
    }
    if (typeof variable !== 'boolean') {
        throw new Error(`TypeError: Variable must be a Boolean. It is instead a ${typeof variable}. variable: ${variable}`)
    }
}

/**
 * Checks if variable is a valid Bit which can be accepted by SQL. Throws appropriate error if not.
 * @param {Any} variable variable to be validated.
 */
export const validateBit = (variable) => {
    if (!variable) {
        throw new Error(`TypeError: Variable is not defined. It must be a Number equaling 0 or 1.`)
    }
    if (typeof variable !== 'Number') {
        throw new Error(`TypeError: Variable must be a Number equaling 0 or 1. It is instead a ${typeof variable}. variable: ${variable}`)
    }
    if (! (variable === 0 || variable === 1)) {
        throw new Error(`TypeError: Variable must be a Number equaling 0 or 1. It is instead equal to ${variable}.`)
    }
}