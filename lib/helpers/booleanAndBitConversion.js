import { validateBoolean, validateBit } from './typeValidation.js'

/**
 * @param {Boolean} booleanVariable 
 * @returns a 0 or a 1, based on the input Boolean
 */
export const booleanToBit = (booleanVariable) => {
    validateBoolean(booleanVariable)
    if (booleanVariable === true) {
        return 1
    } else if (booleanVariable === false) {
        return 0
    } else {
        throw new Error("TypeError: variable should be true or false.")
    }
}

/**
 * @param {Number} bitVariable 
 * @returns a Boolean, based on the input Bit.
 */
export const bitToBoolean = (bitVariable) => {
    validateBit(bitVariable)
    if (booleanVariable === 1) {
        return true
    } else if (booleanVariable === 0) {
        return false
    } else {
        throw new Error("TypeError: variable should be 0 or 1.")
    }
}