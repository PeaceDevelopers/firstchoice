const mongoose = require('mongoose')

const monthlyExpenseSchema = new mongoose.Schema(
    {
        total: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
)

const MonthlyExpense = mongoose.model('MonthlyExpense', monthlyExpenseSchema)

module.exports = MonthlyExpense
