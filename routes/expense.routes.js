const express = require('express')
const expenseRoutes = express.Router()
const { checkHeader } = require('../middlewares/checkHeader')
const checkAdmin = require('../middlewares/checkAdmin')
const {
    getExpenses,
    createExpense,
    deleteExpense,
} = require('../controllers/expense.controller')
expenseRoutes.get('/', checkHeader, checkAdmin, getExpenses)
expenseRoutes.post('/create-expense', checkHeader, checkAdmin, createExpense)
expenseRoutes.delete('/:id', checkHeader, checkAdmin, deleteExpense)

module.exports = expenseRoutes
