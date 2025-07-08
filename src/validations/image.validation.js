import joi from 'joi'

export const imageSchema = joi.object({
    type: joi.string().valid('image/jpeg', 'image/jpg', 'image/png', 'image/gif').required(),
    size: joi.number().max(parseInt(process.env.MAX_FILE_SIZE)).required(), // 5MB max size
    name: joi.string().required(),
})