const mongoose = require('mongoose')

const profitSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
)

const Profit = mongoose.model('Profit', profitSchema)

module.exports = Profit
