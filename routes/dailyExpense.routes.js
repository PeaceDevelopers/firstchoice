const express = require('express')
const dailyExpenseRoutes = express.Router()

const { checkHeader } = require('../middlewares/checkHeader')
const checkAdmin = require('../middlewares/checkAdmin')
const {
    getTodayExpenses,
    getMonthlyExpenses,
} = require('../controllers/backgroundExpenses.controller')

dailyExpenseRoutes.get('/today', checkHeader, checkAdmin, getTodayExpenses)
dailyExpenseRoutes.get('/monthly', checkHeader, checkAdmin, getMonthlyExpenses)

module.exports = dailyExpenseRoutes
