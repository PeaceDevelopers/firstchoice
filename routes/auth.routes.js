const express = require('express')
const router = express.Router()

const {
    loginCompany,
    logoutCompany,
} = require('../controllers/auth.controller')

const { checkHeader } = require('../middlewares/checkHeader')

const checkLoggedIn = (req, res) => {
    if (req.cookies.token || req.cookies.company_id) {
        return res.status(401).json({
            success: false,
            msg: 'You are already logged in',
        })
    }
}

router.post('/auth/login', checkLoggedIn, loginCompany)
router.delete('/auth/logout', checkHeader, logoutCompany)

module.exports = router
