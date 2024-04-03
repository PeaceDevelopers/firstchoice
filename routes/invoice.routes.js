import express from 'express'
const invoiceRoutes = express.Router()
import checkHeader from '../middlewares/checkHeader.js'
import checkAdmin from '../middlewares/checkAdmin.js'
import {
    getAllInvoices,
    generateInvoice,
    deleteInvoice,
    getEmployeeInvoices,
    updateEmployeeInvoiceStatus,
} from '../controllers/invoice.controller.js'

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

export default invoiceRoutes
