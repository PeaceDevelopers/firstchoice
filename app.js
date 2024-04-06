const express = require('express')
require('dotenv').config()
require('./database/config.js')
const cors = require('cors')
const router = require('./routes/auth.routes')
const companyRoutes = require('./routes/company.routes')
const employeeRoutes = require('./routes/employee.routes')
const serviceRoutes = require('./routes/service.routes')
const invoiceRoutes = require('./routes/invoice.routes')
const expenseRoutes = require('./routes/expense.routes')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const {
    scheduleLastDayOfMonthJob,
} = require('./backgroundJobs/profitCalculate')
const {
    scheduleDailyExpenseJob,
    scheduleMonthlyExpenseJob,
} = require('./backgroundJobs/dailyExpense')

const {
    dailyRevenueCalculate,
    monthlyRevenueCalculate,
} = require('./backgroundJobs/revenueJob')

const {
    scheduleEmptyUploadFolderJob,
} = require('./backgroundJobs/EmptyUploadFolder')

const dailyExpenseRoutes = require('./routes/dailyExpense.routes')
const profitRoutes = require('./routes/profit.routes')
const RevenueRoutes = require('./routes/revenue.routes')
const refworkRoutes = require('./routes/refwork.routes')

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
scheduleEmptyUploadFolderJob()
