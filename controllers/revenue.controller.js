const DailyRevenue = require('../models/dailyRevenue.model')
const MonthlyRevenue = require('../models/monthlyRevenue.model')

const getTodayRevenue = async (req, res) => {
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
        return res.status(201).json({
            success: true,
            data: todayRevenue,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getMonthlyRevenue = async (req, res) => {
    try {
        const today = new Date()
        const thisMonthRevenue = await MonthlyRevenue.find({
            createdAt: {
                $gte: new Date(today.getFullYear(), today.getMonth()),
            },
        })

        return res.status(201).json({
            success: true,
            data: thisMonthRevenue,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { getTodayRevenue, getMonthlyRevenue }
