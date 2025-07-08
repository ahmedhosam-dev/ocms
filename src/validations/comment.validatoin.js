import Joi from 'joi'
import { exists } from '../utils/model.utils.js'
import User from '../models/user.model.js'
import Content from '../models/content.model.js'
import Comment from '../models/comment.model.js'

export const createCommentSchema = Joi.object({
    content: Joi.string().external(exists(Content, '_id')).required(),
    user: Joi.string().external(exists(User, '_id')).required(),
    comment: Joi.string().required(),
    parentComment: Joi.string().external(exists(Comment, '_id')).optional(),
})

export const updateCommentSchema = Joi.object({
    content: Joi.string().external(exists(Content, '_id')).required(),
    user: Joi.string().external(exists(User, '_id')).required(),
    comment: Joi.string().required(),
    parentComment: Joi.string().external(exists(Comment, '_id')).optional(),
})