const Company = require('../models/company.model')
const checkCEO = async (req, res, next) => {
    try {
        const company = req.cookies.company_id
        const isExists = await Company.findOne({ _id: company }).select('role')
        if (isExists) {
            if ('ceo' === isExists.role) {
                return next()
            }
        }

        return res.status(403).json({
            success: false,
            msg: 'Unauthorized',
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { checkCEO }
