const mongoose = require('mongoose')

const invoiceEmployeeSchema = new mongoose.Schema(
    {
        invoice_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Invoice',
            required: true,
        },
        employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
            required: true,
        },
        status: {
            type: String,
            enum: [
                'waiting for payment',
                'documents received',
                'in process',
                'approved',
                'return for modification',
                'rejected',
                'completed',
            ],
            default: 'waiting for payment',
            required: true,
        },
    },
    { timestamps: true },
)

const Invoice_Employee = mongoose.model(
    'Invoice_Employee',
    invoiceEmployeeSchema,
)

module.exports = Invoice_Employee
