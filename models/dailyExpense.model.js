const mongoose = require('mongoose')

const dailyExpenseSchema = new mongoose.Schema(
    {
        total: {
            type: Number,
        },
    },
    { timestamps: true },
)

const DailyExpense = mongoose.model('DailyExpense', dailyExpenseSchema)

module.exports = DailyExpense
