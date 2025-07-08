import mongoose from "mongoose";

/**
 * Joi validator to check if a value exists (or doesn't exist) in the database.
 * @param {mongoose.Model} model - Mongoose model (e.g., `User`).
 * @param {String} field - Database field to check (e.g., `email` or `_id`).
 * @param {String} errorMsg - Custom error message (optional).
 * @param {Boolean} unique - If `true`, validates uniqueness (fails if value exists).
 * @returns {Function} Joi validator function.
 */
export const exists = (model, field, errorMsg = undefined, unique = false) => {
  return async (value, helpers) => {
    // Skip if empty (let `required()` handle it)
    if (!value) return value;

    // Validate MongoDB ObjectId format if field is '_id'
    if (field === '_id' && !mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid", { message: "Invalid ID format" });
    }

    const query = { [field]: value };
    const document = await model.findOne(query).lean();

    if (document && unique) {
      throw new Error(errorMsg || `${field} already taken`);
    }

    if (!document && !unique) {
      throw new Error(errorMsg || `${field} not found`);
    }

    return value; // Validation passed
  };
};
