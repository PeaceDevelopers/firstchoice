const express = require('express')
const RevenueRoutes = express.Router()
const { checkHeader } = require('../middlewares/checkHeader')
const { checkCEO } = require('../middlewares/checkCEO')

const {
    getTodayRevenue,
    getMonthlyRevenue,
} = require('../controllers/revenue.controller')

RevenueRoutes.get('/', checkHeader, checkCEO, getTodayRevenue)
RevenueRoutes.get('/monthly', checkHeader, checkCEO, getMonthlyRevenue)

module.exports = RevenueRoutes
