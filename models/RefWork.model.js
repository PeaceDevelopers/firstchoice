const mongoose = require('mongoose')

const refWorkSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        service_name: {
            type: String,
            required: true,
        },
        cost_price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
)

const RefWork = mongoose.model('RefWork', refWorkSchema)

module.exports = RefWork
