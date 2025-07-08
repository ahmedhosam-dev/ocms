import Joi from 'joi'
import { exists } from '../utils/model.utils.js'
import User from '../models/user.model.js'

export const createFollowSchema = Joi.object({
    follower: Joi.string().external(exists(User, '_id')).required(),
    following: Joi.string().external(exists(User, '_id')).required(),
})

export const updateFollowSchema = Joi.object({
    follower: Joi.string().external(exists(User, '_id')).optional(),
    following: Joi.string().external(exists(User, '_id')).optional(),
})