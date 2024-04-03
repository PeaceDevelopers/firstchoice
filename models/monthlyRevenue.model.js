import mongoose from 'mongoose'

const monthlyRevenueSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
)

const MonthlyRevenue = mongoose.model('MonthlyRevenue', monthlyRevenueSchema)
export default MonthlyRevenue
