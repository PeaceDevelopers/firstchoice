const mongoose = require('mongoose')

const dailyRevenueSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
)

const DailyRevenue = mongoose.model('DailyRevenue', dailyRevenueSchema)

module.exports = DailyRevenue
