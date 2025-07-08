import Joi from 'joi'
import { exists } from '../utils/model.utils.js'
import Role from '../models/role.model.js'
import Permission from '../models/permission.model.js'

export const createRoleSchema = Joi.object({
    name: Joi.string().trim().required().lowercase().external(exists(Role, 'name', "Role not found", true)),
    description: Joi.string().trim().optional(),
    permissions: Joi.array().items(Joi.string().external(exists(Permission, '_id', "Permission not found"))).required(),
})

export const updateRoleSchema = Joi.object({
    name: Joi.string().trim().optional().lowercase().external(exists(Role, 'name', "Role not found", true)),
    description: Joi.string().trim().optional(),
    permissions: Joi.array().items(Joi.string().external(exists(Permission, '_id', 'Permission not found'))).optional(),
})