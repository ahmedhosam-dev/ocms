import Joi from 'joi'

export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

export const googleAuthSchema = Joi.object({
    idToken: Joi.string().required(),
})

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
})

export const resetPasswordSchema = Joi.object({
    password: Joi.string().min(8).required(),
    token: Joi.string().required(),
})

export const verifyEmailSchema = Joi.object({
    token: Joi.string().required(),
})
