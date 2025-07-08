import joi from 'joi'

export const createContentSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().optional(),
    type: joi.string().required(),
    markdown: joi.string().required(),
    tags: joi.array().items(joi.string()).optional(),
    visibility: joi.string().required(),
    language: joi.string().required(),
    scheduledPublishDate: joi.date().optional(),
    readTime: joi.number().optional(),
})

export const updateContentSchema = joi.object({
    title: joi.string().optional(),
    description: joi.string().optional(),
    image: joi.string().optional(),
    type: joi.string().optional(),
    markdown: joi.string().optional(),
    tags: joi.array().items(joi.string()).optional(),
    visibility: joi.string().optional(),
    language: joi.string().required(),
    scheduledPublishDate: joi.date().optional(),
    readTime: joi.number().optional(),
})