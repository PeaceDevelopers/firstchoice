import Employee from '../models/employee.model.js'
import { uploadSingle, deleteFile } from '../utils/FileUploader.js'
import fs from 'fs/promises'

export const createEmployee = async (req, res) => {
    try {
        const {
            name,
            labor_card_expiry,
            labor_card_no,
            nationality,
            eid_expiry,
            eid_no,
            company_id,
        } = req.body

        const exists = await Employee.findOne({
            $or: [{ labor_card_no }, { eid_no }],
        })

        if (!exists) {
            const documents = req.files

            const documents_url = []

            for (let i = 0; i < documents.length; i++) {
                const url = await uploadSingle(
                    documents[i].path,
                    documents[i].originalname,
                )
                documents_url.push(url)
                await fs.unlink(documents[i].path)
            }

            const employee = new Employee({
                company_id,
                name,
                labor_card_expiry,
                labor_card_no,
                nationality,
                eid_expiry,
                eid_no,
                documents: documents_url,
            })

            await employee.save()

            return res.status(201).json({
                success: true,
                message: 'Employee created successfully',
                data: employee,
            })
        }
        return res.status(409).json({
            success: false,
            message: 'Employee already exists, please try again',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
            })
        } else {
            res.status(200).json({
                success: true,
                data: employee,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const editEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
            })
        }

        if (req.files) {
            const documents = req.files

            for (let i = 0; i < documents.length; i++) {
                const url = await uploadSingle(
                    documents[i].path,
                    documents[i].originalname,
                )
                employee.documents.push(url)
                fs.unlink(documents[i].path)
            }
        }

        await Employee.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            labor_card_expiry: req.body.labor_card_expiry,
            labor_card_no: req.body.labor_card_no,
            nationality: req.body.nationality,
            eid_expiry: req.body.eid_expiry,
            eid_no: req.body.eid_no,
            documents: employee.documents,
        })

        return res.status(200).json({
            success: true,
            message: 'Employee updated successfully',
            data: employee,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}

export const deleteEmployeeFile = async (req, res) => {
    try {
        const fileIndex = req.body.document
        const employee = await Employee.findById(req.body.employee_id)

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
            })
        }

        const deletedFile = employee.documents.splice(fileIndex, 1)[0]

        if (!deletedFile) {
            return res.status(404).json({
                success: false,
                message: 'File not found',
            })
        }

        // Delete the file from storage
        await deleteFile(deletedFile.fileName)

        // Save the updated employee document
        await employee.save()

        return res.status(200).json({
            success: true,
            message: 'File deleted successfully',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
            })
        } else {
            const documents = employee.documents
            if (documents.length > 0) {
                for (let i = 0; i < documents.length; i++) {
                    await deleteFile(documents[i].fileName)
                    await fs.unlink(documents[i].path)
                }
            }
            await Employee.deleteOne({ _id: req.params.id })

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

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
        res.status(201).json({
            success: true,
            data: employees,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}
