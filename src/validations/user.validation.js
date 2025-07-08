import Joi from 'joi'
import { UserStatus } from '../Enums/status.enum.js'
import { exists } from '../utils/model.utils.js'
import User from '../models/user.model.js'
import Role from '../models/role.model.js'
import Category from '../models/category.model.js'

export const createUserSchema = Joi.object({
    name: Joi.string().required().trim(),
    phoneNumber: Joi.string().trim().min(10).max(15).optional(),
    bio: Joi.string().max(500).optional(),
    email: Joi.string().email().required().external(exists(User, 'email', 'Email already taken', true)),
    password: Joi.string().min(8).required(),
    avatar: Joi.string().pattern(/^[a-zA-Z0-9_-]+\.(png|jpg|jpeg|gif)$/i).optional(),
    role: Joi.string().required().external(exists(Role, '_id', 'Role not found')),
    category: Joi.string().optional().external(exists(Category, '_id')),
    status: Joi.string().valid(...Object.values(UserStatus)).optional(),
})

export const updateUserSchema = Joi.object({
    name: Joi.string().optional().trim(),
    phoneNumber: Joi.string().trim().min(10).max(15).optional(),
    bio: Joi.string().max(500).optional(),
    email: Joi.string().email().optional().external(exists(User, 'email', 'Email already taken', true)),
    password: Joi.string().min(8).optional(),
    avatar: Joi.string().pattern(/^[a-zA-Z0-9_-]+\.(png|jpg|jpeg|gif)$/i).optional(),
    role: Joi.string().optional().external(exists(Role, '_id', 'Role not found')),
    category: Joi.string().optional().external(exists(Category, '_id')),
    status: Joi.string().valid(...Object.values(UserStatus)).optional(),
})
