import Joi from 'joi'

const serviceSchema = Joi.object({
    name: Joi.string().min(3).max(60).empty().required().messages({
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 60 characters long',
        'any.required': 'Name is required',
        'string.empty': 'Name cannot be empty',
    }),
    cost_price: Joi.number().required().empty().messages({
        'any.required': 'Cost price is required',
        'number.empty': 'Cost price cannot be empty',
    }),
})

export default serviceSchema
