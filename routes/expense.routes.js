import express from 'express'
const expenseRoutes = express.Router()
import checkHeader from '../middlewares/checkHeader.js'
import checkAdmin from '../middlewares/checkAdmin.js'
import {
    getExpenses,
    createExpense,
    deleteExpense,
} from '../controllers/expense.controller.js'
expenseRoutes.get('/', checkHeader, checkAdmin, getExpenses)
expenseRoutes.post('/create-expense', checkHeader, checkAdmin, createExpense)
expenseRoutes.delete('/:id', checkHeader, checkAdmin, deleteExpense)

export default expenseRoutes
