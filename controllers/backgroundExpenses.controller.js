import DailyExpense from '../models/dailyExpense.model.js'
import MonthlyExpense from '../models/monthlyExpense.model.js'

export const getTodayExpenses = async (req, res) => {
    try {
        const today = new Date()
        const expenses = await DailyExpense.find({
            createdAt: {
                $gte: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                ),
            },
        })
            .sort({ timestamps: -1 })
            .exec()
            .catch((error) => {
                console.log(error)
            })

        if (expenses.length > 0) {
            return res.status(201).json({
                success: true,
                data: expenses.total,
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'No expenses found for today',
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const getMonthlyExpenses = async (req, res) => {
    try {
        const expenses = await MonthlyExpense.find({
            createdAt: {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth()),
            },
        })
            .sort({ timestamps: -1 })
            .exec()
            .catch((error) => {
                console.log(error)
            })
        return res.status(201).json({
            success: true,
            data: expenses,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}
