import cron from 'node-cron'
import DailyExpense from '../models/dailyExpense.model.js'
import MonthlyExpense from '../models/monthlyExpense.model.js'
export const scheduleDailyExpenseJob = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            const today = new Date()

            const getTodayExpense = await DailyExpense.findOne({
                createdAt: {
                    $gte: new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate(),
                    ),
                },
            }).exec()

            if (!getTodayExpense) {
                const todayExpense = await DailyExpense.create({
                    total: 0,
                })
                console.log('Daily Expense Added')
            } else {
                console.log('Daily Expense Already Exists')
            }
        } catch (error) {
            console.error('Error running daily expense job:', error)
        }
    })
}

export const scheduleMonthlyExpenseJob = () => {
    cron.schedule('0 0 1 * *', async () => {
        try {
            const currentMonth = new Date().getMonth()
            const currentYear = new Date().getFullYear()

            const expenses = await DailyExpense.find({
                createdAt: {
                    $gte: new Date(currentYear, currentMonth),
                },
            })

            if (expenses.length > 0) {
                let monthly_expenses = 0
                for (let i = 0; i < expenses.length; i++) {
                    monthly_expenses += expenses[i].total
                }

                await MonthlyExpense.create({
                    total: monthly_expenses,
                })
                console.log('Monthly Expense Added')
            }
        } catch (error) {
            console.error('Error running monthly expense job:', error)
        }
    })
}
