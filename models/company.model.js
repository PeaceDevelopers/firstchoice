import mongoose from 'mongoose'

const companySchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 60,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 60,
        },
        phone: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 60,
        },
        role: {
            type: String,
            enum: ['ceo', 'admin', 'company'],
            default: 'company',
            required: true,
        },
        licence_expiry: {
            type: Date,
            required: true,
            default: null,
        },
        img_card_expiry: {
            type: Date,
            required: true,
            default: null,
        },
        logo: {
            type: Object,
            default: null,
        },
        documents: {
            type: Array,
            default: null,
            maxlength: 7,
        },
    },
    {
        timestamps: true,
    },
)

const Company = mongoose.model('Company', companySchema)

export default Company
