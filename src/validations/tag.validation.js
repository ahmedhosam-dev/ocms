import Joi from 'joi'
import { exists } from '../utils/model.utils.js'

export const createTagSchema = Joi.object({
    name: Joi.string().trim().required().lowercase().external(exists(Role, 'name', true)),
})

export const updateTagSchema = Joi.object({
    name: Joi.string().trim().optional().lowercase().external(exists(Role, 'name', true)),
})