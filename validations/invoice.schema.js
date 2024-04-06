const Joi = require('joi')

const invoiceSchema = Joi.object({
    service_id: Joi.string().empty().required().messages({
        'any.required': 'Service id is required',
        'string.empty': 'Service id cannot be empty',
    }),
    company_id: Joi.string().required().empty().messages({
        'any.required': 'Company id is required',
        'string.empty': 'Company id cannot be empty',
    }),
    quantity: Joi.number().required().empty().messages({
        'any.required': 'Quantity is required',
        'number.empty': 'Quantity cannot be empty',
    }),
    sale_price: Joi.number().required().empty().messages({
        'any.required': 'Sale price is required',
        'number.empty': 'Sale price cannot be empty',
    }),
    total_price: Joi.number().required().empty().greater(0).messages({
        'any.required': 'Total price is required',
        'number.empty': 'Total price cannot be empty',
        'number.greater': 'Total price must be greater than 0',
    }),
    pending_amount: Joi.number().required().empty().messages({
        'number.empty': 'Pending amount cannot be empty',
        'any.required': 'Pending amount is required',
    }),
    employees: Joi.array().required().empty().messages({
        'any.required': 'Employees is required',
        'array.empty': 'Employees cannot be empty',
    }),
})

module.exports = invoiceSchema
