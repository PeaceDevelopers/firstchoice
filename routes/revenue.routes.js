import express from 'express'
const RevenueRoutes = express.Router()
import checkHeader from '../middlewares/checkHeader.js'
import checkCEO from '../middlewares/checkCEO.js'

import {
    getTodayRevenue,
    getMonthlyRevenue,
} from '../controllers/revenue.controller.js'

RevenueRoutes.get('/', checkHeader, checkCEO, getTodayRevenue)
RevenueRoutes.get('/monthly', checkHeader, checkCEO, getMonthlyRevenue)

export default RevenueRoutes
