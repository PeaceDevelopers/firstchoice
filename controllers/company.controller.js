import Company from '../models/company.model.js'
import { uploadSingle, deleteFile } from '../utils/FileUploader.js'
import { hashPassword } from '../utils/bcryptPassword.js'
import fs from 'fs/promises'
import companySchema from '../validations/company.schema.js'

export const createCompany = async (req, res) => {
    const { error } = companySchema.validate(req.body)
    if (!error) {
        if (!req.files.logo && !req.files.documents) {
            return res.status(400).json({
                success: false,
                message: 'Please upload documents',
            })
        }
        try {
            const existingCompany = await Company.find({
                username: req.body.username,
            }).exec()

            if (existingCompany) {
                if (existingCompany.username === req.body.username) {
                    res.status(409).json({
                        success: false,
                        message: 'Username already exists',
                    })
                } else {
                    res.status(409).json({
                        success: false,
                        message: 'Email already exists',
                    })
                }
                return
            }

            const filePath = req.files.logo[0].path
            const fileName = req.files.logo[0].originalname

            const documents = req.files.documents

            const password = await hashPassword(req.body.password)
            const logoUrl = await uploadSingle(filePath, fileName)

            const documentUrls = []

            for (let i = 0; i < documents.length; i++) {
                const url = await uploadSingle(
                    documents[i].path,
                    documents[i].originalname,
                )
                documentUrls.push(url)
                await fs.unlink(documents[i].path)
            }

            await fs.unlink(filePath)

            const company = new Company({
                username: req.body.username,
                password: password,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role,
                licence_expiry: req.body.licence_expiry,
                img_card_expiry: req.body.img_card_expiry,
                logo: logoUrl,
                documents: documentUrls,
            })
            await company.save()

            const dataToReturn = {
                username: company.username,
                email: company.email,
                phone: company.phone,
                role: company.role,
                licence_expiry: company.licence_expiry,
                img_card_expiry: company.img_card_expiry,
                logo: company.logo,
                documents: company.documents,
            }

            res.status(200).json({
                success: true,
                message: 'Company created successfully',
                data: company,
            })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    } else {
        res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }
}

export const getCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).select(
            '-password',
        )

        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Company not found',
            })
        } else {
            res.json({
                success: true,
                data: company,
            })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().select('-password')
        if (companies.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No companies found',
            })
        } else {
            res.json({
                success: true,
                data: companies,
            })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const editCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Company not found',
            })
        } else {
            const newlogo = await uploadSingle(
                req.file.path,
                req.file.originalname,
            )

            const updatedCompany = await Company.findByIdAndUpdate(
                { _id: company._id },
                {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    phone: req.body.phone,
                    role: req.body.role,
                    licence_expiry: req.body.licence_expiry,
                    img_card_expiry: req.body.img_card_expiry,
                    logo: newlogo,
                },
                {
                    new: true,
                    runValidators: true,
                },
            )

            await deleteFile(company.logo.fileName)

            fs.unlink(req.file.path)
            res.json({
                success: true,
                message: 'Company updated successfully',
                data: updatedCompany,
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Company not found',
            })
        } else {
            const documents = company.documents
            if (documents.length > 0) {
                for (let i = 0; i < documents.length; i++) {
                    await deleteFile(documents[i].fileName)
                    await fs.unlink(documents[i].path)
                }
            }
            const logo = company.logo

            await deleteFile(logo.fileName)
            await fs.unlink(logo.path)

            await Company.deleteOne({ _id: req.params.id })

            res.status(200).json({
                success: true,
                message: 'Employee deleted successfully',
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const getEmployeesOfCompany = async (req, res) => {
    try {
        const employees = await Employee.find({ company: req.params.company })
        res.status(201).json({
            success: true,
            data: employees,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}
