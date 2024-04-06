const Expense = require('../models/expense.model')

const expenseSchema = require('../validations/expense.schema')
const Company = require('../models/company.model')
const DailyExpense = require('../models/dailyExpense.model')

const createExpense = async (req, res) => {
    try {
        const { error } = expenseSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            })
        }

        const company = await Company.findById(req.body.company_id).exec()

        if (!company || company.role == 'admin') {
            return res.status(400).json({
                success: false,
                message: 'Only admin can create expenses',
            })
        }
        const todayExpense = await DailyExpense.findOne({
            createdAt: {
                $gte: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                ),
            },
        }).exec()
        const expense = await Expense.create(req.body)

        if (todayExpense) {
            await DailyExpense.findByIdAndUpdate(todayExpense._id, {
                $inc: { total: expense.amount },
            })
            console.log('Daily expense updated')
        } else {
            await DailyExpense.create({ total: expense.amount })
            console.log('New Daily EXpense created then updated')
        }

        return res.status(201).json({
            success: true,
            data: expense,
            message: 'Expense created successfully',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find()
        res.status(201).json({
            success: true,
            data: expenses,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: 'Expense deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    createExpense,
    getExpenses,
    deleteExpense,
}
