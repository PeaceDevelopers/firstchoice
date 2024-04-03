import Company from '../models/company.model.js'
const checkCEO = async (req, res, next) => {
    try {
        const company = req.cookies.company
        const isExists = await Company.findOne({ username: company }).select(
            'role',
        )
        if ('ceo' === isExists.role) {
            return next()
        }

        return res.status(403).json({
            success: false,
            msg: 'Unauthorized',
        })
    } catch (error) {
        console.log(error)
    }
}

export default checkCEO
