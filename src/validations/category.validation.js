import Joi from 'joi'
import { exists } from '../utils/model.utils.js'
import Category from '../models/category.model.js'

export const createCategorySchema = Joi.object({
    name: Joi.string().trim().required().lowercase().external(exists(Category, 'name', "Category not found", true)),
    description: Joi.string().trim().optional(),
})

export const updateCategorySchema = Joi.object({
    name: Joi.string().trim().optional().lowercase().external(exists(Category, 'name', "Category not found", true)),
    description: Joi.string().trim().optional(),
})
