const express = require('express')
const invoiceRoutes = express.Router()
const { checkHeader } = require('../middlewares/checkHeader')
const checkAdmin = require('../middlewares/checkAdmin')
const {
    getAllInvoices,
    generateInvoice,
    deleteInvoice,
    getEmployeeInvoices,
    updateEmployeeInvoiceStatus,
} = require('../controllers/invoice.controller')

invoiceRoutes.get('/', checkHeader, checkAdmin, getAllInvoices)
invoiceRoutes.post(
    '/generate-invoice',
    checkHeader,
    checkAdmin,
    generateInvoice,
)
invoiceRoutes.delete('/:id', checkHeader, checkAdmin, deleteInvoice)
invoiceRoutes.get('/:id', checkHeader, checkAdmin, getEmployeeInvoices)
invoiceRoutes.put(
    '/:invoice_id/:employee_id',
    checkHeader,
    checkAdmin,
    updateEmployeeInvoiceStatus,
)

module.exports = invoiceRoutes
