const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema(
    {
        company_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },

        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 100,
        },
        description: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 200,
        },
        amount: {
            type: Number,
            required: true,
        },
        used_by: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
