const Joi = require('joi')

const expenseSchema = Joi.object({
    name: Joi.string().min(2).max(100).empty().required().messages({
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name must be at most 100 characters long',
        'any.required': 'Name is required',
        'string.empty': 'Name cannot be empty',
    }),
    description: Joi.string().min(2).max(200).empty().required().messages({
        'string.min': 'Description must be at least 2 characters long',
        'string.max': 'Description must be at most 200 characters long',
        'any.required': 'Description is required',
        'string.empty': 'Description cannot be empty',
    }),
    amount: Joi.number().required().empty().messages({
        'any.required': 'Amount is required',
        'number.empty': 'Amount cannot be empty',
    }),
    used_by: Joi.string().required().empty().messages({
        'any.required': 'Used by is required',
        'string.empty': 'Used by cannot be empty',
    }),
    company_id: Joi.string().required().empty().messages({
        'any.required': 'Company id is required',
        'string.empty': 'Company id cannot be empty',
    }),
})

module.exports = expenseSchema
