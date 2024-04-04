import Joi from 'joi'

const companySchema = Joi.object({
    username: Joi.string().min(3).max(60).required().messages({
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be at most 60 characters long',
        'any.required': 'Username is required',
    }),
    password: Joi.string().min(8).max(1024).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must be at most 1024 characters long',
        'any.required': 'Password is required',
    }),
    email: Joi.string()
        .min(3)
        .max(60)
        .required()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .messages({
            'string.min': 'Email must be at least 3 characters long',
            'string.max': 'Email must be at most 60 characters long',
            'any.required': 'Email is required',
        }),
    phone: Joi.string().min(3).max(60).required().messages({
        'string.min': 'Phone must be at least 3 characters long',
        'string.max': 'Phone must be at most 60 characters long',
        'any.required': 'Phone is required',
    }),
    role: Joi.string().valid('ceo', 'admin', 'company').required().messages({
        'any.required': 'Role is required',
        'any.only': 'Invalid role',
    }),
    licence_expiry: Joi.date().greater(new Date()).required().messages({
        'any.required': 'Licence expiry is required',
        'date.greater': 'Licence expiry must be greater than today',
    }),
    img_card_expiry: Joi.date().greater(new Date()).required().messages({
        'any.required': 'Image card expiry is required',
        'date.greater': 'Image card expiry must be greater than today',
    }),
})

export default companySchema
