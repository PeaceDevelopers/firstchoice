import express from 'express'
const dailyExpenseRoutes = express.Router()

import checkHeader from '../middlewares/checkHeader.js'
import checkAdmin from '../middlewares/checkAdmin.js'
import {
    getTodayExpenses,
    getMonthlyExpenses,
} from '../controllers/backgroundExpenses.controller.js'

dailyExpenseRoutes.get('/today', checkHeader, checkAdmin, getTodayExpenses)
dailyExpenseRoutes.get('/monthly', checkHeader, checkAdmin, getMonthlyExpenses)

export default dailyExpenseRoutes
