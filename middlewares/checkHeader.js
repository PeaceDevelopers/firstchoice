const checkHeader = (req, res, next) => {
    try {
        if (!req.cookies.token || !req.cookies.company_id) {
            return res.status(401).json({
                success: false,
                msg: 'You must be logged In',
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}
module.exports = { checkHeader }
