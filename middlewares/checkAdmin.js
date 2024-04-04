import Company from '../models/company.model.js'
const checkAdmin = async (req, res, next) => {
    try {
        const company = req.cookies.company_id
        if (company) {
            const isExists = await Company.findOne({
                _id: company,
            }).select('role')
            if (isExists) {
                if ('ceo' === isExists.role || 'admin' === isExists.role) {
                    return next()
                }
            } else {
                return res.status(403).json({
                    success: false,
                    msg: 'Unauthorized',
                })
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

export default checkAdmin
