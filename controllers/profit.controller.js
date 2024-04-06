const Profit = require('../models/profit.model')

const getThisMonthProfit = async (req, res) => {
    try {
        const profit = await Profit.find({
            createdAt: {
                $gte: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() - 1,
                ),
            },
        })
        res.status(201).json({
            success: true,
            data: profit,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { getThisMonthProfit }
