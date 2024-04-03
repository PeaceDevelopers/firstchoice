import mongoose from 'mongoose'

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
export default MonthlyExpense
