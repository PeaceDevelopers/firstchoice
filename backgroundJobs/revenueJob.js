import DailyRevenue from '../models/dailyRevenue.model.js'
import MonthlyRevenue from '../models/monthlyRevenue.model.js'
import Invoice from '../models/invoice.model.js'
import cron from 'node-cron'

export const dailyRevenueCalculate = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            const today = new Date()
            const todayRevenue = await DailyRevenue.find({
                createdAt: {
                    $gte: new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate(),
                    ),
                },
            }).exec()
            let revenue = 0

            const invoices = await Invoice.find({
                createdAt: {
                    $gte: new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate(),
                    ),
                },
            }).exec()

            if (invoices.length > 0) {
                for (let i = 0; i < invoices.length; i++) {
                    revenue += invoices[i].total_price
                }
            }
            if (todayRevenue.length > 0) {
                const newRevenue = await DailyRevenue.findByIdAndUpdate(
                    todayRevenue[0]._id,
                    {
                        amount: revenue,
                    },
                ).exec()
                console.log('Revenue Updated')
            } else {
                const newRevenue = await DailyRevenue.create({
                    amount: revenue,
                })
                console.log('Revenue Added')
            }
        } catch (error) {
            console.log(error.message)
        }
    })
}

export const monthlyRevenueCalculate = () => {
    cron.schedule('0 0 1 * *', async () => {
        try {
            const today = new Date()
            const thisMonthRevenue = await MonthlyRevenue.find({
                createdAt: {
                    $gte: new Date(today.getFullYear(), today.getMonth()),
                },
            }).exec()

            const thisMonthRevenues = await DailyRevenue.find({
                createdAt: {
                    $gte: new Date(today.getFullYear(), today.getMonth()),
                },
            }).exec()

            let revenue = 0
            if (thisMonthRevenues.length > 0) {
                for (let i = 0; i < thisMonthRevenues.length; i++) {
                    revenue += thisMonthRevenues[i].amount
                }
            }
            if (thisMonthRevenue.length > 0) {
                const newRevenue = await MonthlyRevenue.findByIdAndUpdate(
                    thisMonthRevenue[0]._id,
                    {
                        amount: revenue,
                    },
                ).exec()
                console.log('Monthly Revenue Updated')
            } else {
                const newRevenue = await MonthlyRevenue.create({
                    amount: revenue,
                })
                console.log('Monthly Revenue Added')
            }
        } catch (error) {
            console.log(error.message)
        }
    })
}
