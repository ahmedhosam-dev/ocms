import Joi from 'joi'
import { exists } from '../utils/model.utils.js'
import User from '../models/user.model.js'
import { notificationAbout } from '../Enums/target.enum.js'
import { notificationType } from '../Enums/notification.enum.js'

export const createNotificationSchema = Joi.object({
    user: Joi.string().external(exists(User, '_id')).required(),
    type: Joi.string().valid(...Object.values(notificationType)).required(),
    description: Joi.string().optional(),
    targetType: Joi.string().valid(...Object.values(notificationAbout)).required(),
    target: Joi.string().external(exists(Joi.ref('targetType'), '_id')).required(),
    isRead: Joi.boolean().optional(),
})

export const updateNotificationSchema = Joi.object({
    user: Joi.string().external(exists(User, '_id')).optional(),
    type: Joi.string().valid(...Object.values(notificationType)).optional(),
    description: Joi.string().optional(),
    targetType: Joi.string().valid(...Object.values(notificationAbout)).optional(),
    target: Joi.string().external(exists(Joi.ref('targetType'), '_id')).optional(),
    isRead: Joi.boolean().optional(),
})
