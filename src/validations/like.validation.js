import Joi from 'joi'
import { exists } from '../utils/model.utils.js'
import User from '../models/user.model.js'
import { LikeStatus } from '../Enums/status.enum.js'
import { likeOn } from '../Enums/target.enum.js'

export const createLikeSchema = Joi.object({
    targetType: Joi.string().valid(...Object.values(likeOn)).required(),
    target: Joi.string().external(exists(Joi.ref('targetType'), '_id')).required(),
    user: Joi.string().external(exists(User, '_id')).required(),
    status: Joi.string().valid(...LikeStatus).required(),
})

export const updateLikeSchema = Joi.object({
    targetType: Joi.string().valid(...Object.values(likeOn)).optional(),
    target: Joi.string().external(exists(Joi.ref('targetType'), '_id')).optional(),
    user: Joi.string().external(exists(User, '_id')).optional(),
    status: Joi.string().valid(...LikeStatus).optional(),
})