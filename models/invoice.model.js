const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema(
    {
        service_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        },
        company_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        sale_price: {
            type: Number,
            required: true,
        },
        total_price: {
            type: Number,
            required: true,
        },
        pending_amount: {
            type: Number,
            required: true,
        },
        creation_month: {
            type: Number,
            required: true,
        },
        creation_year: {
            type: Number,
            required: true,
        },
        employees: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Employee',
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice
