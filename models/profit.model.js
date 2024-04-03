import mongoose from 'mongoose'

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
export default Profit
