/**
 * Joi validator for enum objects
 * @param {Object} enumObj - Enum object (e.g., UserStatus)
 * @param {String} errorMsg - Custom error message
 * @returns {Function} Joi validator function
 */
export const valid = (enumObj, errorMsg) => {
    const validValues = Object.values(enumObj);
    
    return (value, helpers) => {
      // Skip if empty (let `required()` handle it)
      if (!value) return value;
  
      if (!validValues.includes(value)) {
        return helpers.error("any.invalid", {
          message: errorMsg || `Must be one of: ${validValues.join(', ')}`,
        });
      }
  
      return value; // Validation passed
    };
};