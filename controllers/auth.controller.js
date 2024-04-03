import Company from '../models/company.model.js'
import generateToken from './generateToken.js'
import { comparePassword } from '../utils/bcryptPassword.js'

export const loginCompany = async (req, res) => {
    try {
        const { email, password } = req.body
        const company = await Company.findOne({ email })
        if (!company) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
            })
        }
        const isMatch = await comparePassword(password, company.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
            })
        }
        const token = generateToken(company)

        const dataToSend = {
            _id: company._id,
            username: company.username,
            email: company.email,
            address: company.address,
            phone: company.phone,
            role: company.role,
        }
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        })
        res.cookie('company', company.username, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        })
        res.json({ success: true, data: dataToSend })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const logoutCompany = async (req, res) => {
    try {
        res.clearCookie('token')
        res.json({ success: true, message: 'Logged out successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Something went wrong' })
    }
}
