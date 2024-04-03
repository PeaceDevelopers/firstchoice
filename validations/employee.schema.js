import Joi from 'joi'

const employeeSchema = Joi.object({
    name: Joi.string().min(3).max(60).required().messages({
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 60 characters long',
        'any.required': 'Name is required',
    }),
    labor_card_expiry: Joi.date().greater(new Date()).required().messages({
        'any.required': 'Labor card expiry is required',
        'date.greater': 'Labor card expiry must be greater than today',
    }),
    labor_card_no: Joi.string().min(3).max(60).required().messages({
        'string.min': 'Labor card number must be at least 3 characters long',
        'string.max': 'Labor card number must be at most 60 characters long',
        'any.required': 'Labor card number is required',
    }),
    nationality: Joi.string().min(3).max(60).required().messages({
        'string.min': 'Nationality must be at least 3 characters long',
        'string.max': 'Nationality must be at most 60 characters long',
        'any.required': 'Nationality is required',
    }),
    eid_expiry: Joi.date().greater(new Date()).required().messages({
        'any.required': 'EID expiry is required',
        'date.greater': 'EID expiry must be greater than today',
    }),
    eid_no: Joi.string().required().messages({
        'any.required': 'EID number is required',
    }),
})

export default employeeSchema
