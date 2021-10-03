/**
 * @returns an object containing type validator functions
 */
function validate() {
    return {
        /**
         * Checks if variable is a valid String. Throws appropriate error if not.
         * @param {Any} variable variable to be validated.
         */
        validateString: (variable) => {
            if (!variable) {
                throw new Error(`TypeError: Variable is not defined. It must be a String.`)
            }
            
            if (typeof variable !== 'string') {
                throw new Error(`TypeError: Variable must be a String. It is instead a ${typeof variable}.`)
            }
        },

        /**
         * Checks if variable is a valid Integer. Throws appropriate error if not.
         * @param {Any} variable variable to be validated.
         */
        validateInteger: (variable) => {
            if (!variable) {
                throw new Error(`TypeError: Variable is not defined. It must be a number which is an Integer.`)
            }

            if (typeof variable !== 'number') {
                throw new Error(`TypeError: Variable must be a Number which is an Integer. It is instead a ${typeof variable}.`)
            }
            
            if (!Number.isInteger(variable)) {
                throw new Error(`Variable must be an Integer. Current value is ${variable}.`)
            }
        },

        validateBoolean: (variable) => {
            if (!variable) {
                throw new Error(`TypeError: Variable is not defined. It must be a Boolean.`)
            }

            if (typeof variable !== 'boolean') {
                throw new Error(`TypeError: Variable must be a Boolean. It is instead a ${typeof variable}.`)
            }
        }
    }
}

module.exports = validate()