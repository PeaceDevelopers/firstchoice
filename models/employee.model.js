import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50,
        },
        labor_card_expiry: {
            type: Date,
            required: true,
        },
        labor_card_no: {
            type: String,
            required: true,
            unique: true,
        },
        nationality: {
            type: String,
            required: true,
        },
        eid_expiry: {
            type: Date,
            required: true,
        },
        eid_no: {
            type: String,
            required: true,
            unique: true,
        },
        documents: {
            type: Array,
            required: true,
            default: null,
            maxlength: 7,
        },
    },
    {
        timestamps: true,
    },
)

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
