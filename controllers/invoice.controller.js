const Invoice = require('../models/invoice.model')
const Invoice_Employee = require('../models/Invoice_Employee.model')
const invoiceSchema = require('../validations/invoice.schema')

const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
        res.status(201).json({
            success: true,
            data: invoices,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

const generateInvoice = async (req, res) => {
    try {
        const { error } = invoiceSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            })
        }
        const { total_price, pending_amount } = req.body

        if (pending_amount > total_price) {
            return res.status(400).json({
                success: false,
                message: 'Pending amount cannot be greater than Total Price',
            })
        }

        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()

        const invoice = {
            service_id: req.body.service_id,
            company_id: req.body.company_id,
            quantity: req.body.quantity,
            sale_price: req.body.sale_price,
            total_price: req.body.total_price,
            pending_amount: req.body.pending_amount,
            creation_month: month,
            creation_year: year,
            employees: req.body.employees,
        }

        const newInvoice = await Invoice.create(invoice)
        let invoiceEmployeees
        if (req.body.employees) {
            req.body.employees.forEach(async (employee) => {
                const invoice_employee = {
                    invoice_id: newInvoice._id,
                    employee_id: employee,
                }
                invoiceEmployeees = await Invoice_Employee.create(
                    invoice_employee,
                )
            })
        }

        return res.status(201).json({
            success: true,
            data: { newInvoice, invoiceEmployeees },
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const deleteInvoice = async (req, res) => {
    try {
        const invoiceId = req.params.id
        const invoice = Invoice.findById(invoiceId)

        if (invoice) {
            await Invoice.findByIdAndDelete(invoiceId)
            const invoiceEmployee = await Invoice_Employee.deleteMany({
                invoice_id: invoiceId,
            })
            return res.status(200).json({
                success: true,
                message: 'Invoice deleted successfully',
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found',
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getEmployeeInvoices = async (req, res) => {
    try {
        const invoices = await Invoice_Employee.find({
            invoice_id: req.params.id,
        })
        res.status(201).json({
            success: true,
            data: invoices,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

const updateEmployeeInvoiceStatus = async (req, res) => {
    try {
        const { invoice_id, employee_id } = req.params
        const status = req.body.status

        const invoiceEmployee = await Invoice_Employee.findOne({
            invoice_id,
            employee_id,
        })

        if (invoiceEmployee) {
            invoiceEmployee.status = status
            await invoiceEmployee.save()
            return res.status(200).json({
                success: true,
                message: 'Invoice status updated successfully',
            })
        }

        return res.status(404).json({
            success: false,
            message: 'Invoice not found',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    getAllInvoices,
    generateInvoice,
    deleteInvoice,
    getEmployeeInvoices,
    updateEmployeeInvoiceStatus,
}
