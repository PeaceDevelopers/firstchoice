import cron from 'node-cron'
import Profit from '../models/profit.model.js'
import Invoice from '../models/invoice.model.js'
import Service from '../models/service.model.js'
import { configDotenv } from 'dotenv'
import mongoose from 'mongoose'

configDotenv()

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB', error)
    }
}

const calculateProfit = async () => {
    try {
        const currentMonth = new Date().getMonth() + 1
        const currentYear = new Date().getFullYear()

        const invoices = await Invoice.find({
            $and: [
                { creation_month: currentMonth },
                { creation_year: currentYear },
            ],
        }).exec()
        const services = await Service.find()

        let sale_price = 0
        let cost_price = 0
        if (invoices.length > 0) {
            for (let i = 0; i < invoices.length; i++) {
                sale_price += invoices[i].total_price
                for (let j = 0; j < services.length; j++) {
                    if (
                        invoices[i].service_id.toString() ===
                        services[j]._id.toString()
                    ) {
                        cost_price += services[j].cost_price
                    }
                }
            }
            const profit = sale_price - cost_price

            const newProfit = new Profit({
                amount: profit,
            })

            await newProfit.save()
        } else {
            console.log('No Inoice')
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const scheduleLastDayOfMonthJob = () => {
    cron.schedule('30 23 28-31 * *', async () => {
        try {
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)

            await connectDatabase()
            await calculateProfit()

            if (today.getMonth() !== tomorrow.getMonth()) {
                await connectDatabase()
                await calculateProfit()
                console.log('Profit Calculated')
            }
        } catch (error) {
            console.error('Error running last day of month job:', error)
        }
    })
}
