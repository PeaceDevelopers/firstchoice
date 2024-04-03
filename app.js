import express from 'express'
import { configDotenv } from 'dotenv'
import './database/config.js'
import cors from 'cors'
import router from './routes/auth.routes.js'
import companyRoutes from './routes/company.routes.js'
import employeeRoutes from './routes/employee.routes.js'
import serviceRoutes from './routes/service.routes.js'
import invoiceRoutes from './routes/invoice.routes.js'
import expenseRoutes from './routes/expense.routes.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { scheduleLastDayOfMonthJob } from './backgroundJobs/profitCalculate.js'
import {
    scheduleDailyExpenseJob,
    scheduleMonthlyExpenseJob,
} from './backgroundJobs/dailyExpense.js'
import {
    dailyRevenueCalculate,
    monthlyRevenueCalculate,
} from './backgroundJobs/revenueJob.js'

import dailyExpenseRoutes from './routes/dailyExpense.routes.js'
import profitRoutes from './routes/profit.routes.js'
import RevenueRoutes from './routes/revenue.routes.js'
import refworkRoutes from './routes/refwork.routes.js'

configDotenv()

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())

app.use('/', router)

app.use('/company', companyRoutes)
app.use('/employee', employeeRoutes)
app.use('/services', serviceRoutes)
app.use('/invoices', invoiceRoutes)
app.use('/expenses', expenseRoutes)
app.use('/daily-expenses', dailyExpenseRoutes)
app.use('/profit', profitRoutes)
app.use('/revenue', RevenueRoutes)
app.use('/refworks', refworkRoutes)

app.listen(process.env.PORT, () => {
    console.log('server is running on port 3000')
})

scheduleLastDayOfMonthJob()
scheduleDailyExpenseJob()
scheduleMonthlyExpenseJob()
dailyRevenueCalculate()
monthlyRevenueCalculate()
