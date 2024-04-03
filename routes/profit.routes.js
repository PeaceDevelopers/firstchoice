import express from 'express'
const profitRoutes = express.Router()

import { getThisMonthProfit } from '../controllers/profit.controller.js'
import checkHeader from '../middlewares/checkHeader.js'
import checkAdmin from '../middlewares/checkAdmin.js'
profitRoutes.get('/', checkHeader, checkAdmin, getThisMonthProfit)

export default profitRoutes
