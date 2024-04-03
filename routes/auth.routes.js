import express from 'express'
const router = express.Router()
import { loginCompany, logoutCompany } from '../controllers/auth.controller.js'
import checkHeader from '../middlewares/checkHeader.js'

router.post('/auth/login', loginCompany)
router.delete('/auth/logout', checkHeader, logoutCompany)

export default router
