import Joi from 'joi'
import { action, feature } from '../Enums/permission.enum.js'

export const createPermissionSchema = Joi.object({
    feature: Joi.string().valid(...Object.values(feature)).required(),
    action: Joi.string().valid(...Object.values(action)).required(),
})

export const updatePermissionSchema = Joi.object({
    feature: Joi.string().valid(...Object.values(feature)).optional(),
    action: Joi.string().valid(...Object.values(action)).optional(),
})