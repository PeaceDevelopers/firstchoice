const express = require('express')
const profitRoutes = express.Router()

const { getThisMonthProfit } = require('../controllers/profit.controller')
const { checkHeader } = require('../middlewares/checkHeader')
const checkAdmin = require('../middlewares/checkAdmin')
profitRoutes.get('/', checkHeader, checkAdmin, getThisMonthProfit)

module.exports = profitRoutes
