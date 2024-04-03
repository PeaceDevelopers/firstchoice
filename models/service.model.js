import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 100,
            unique: true,
            index: true,
        },
        cost_price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Service = mongoose.model('Service', serviceSchema)

export default Service
