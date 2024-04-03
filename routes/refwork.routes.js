import express from 'express'
const refworkRoutes = express.Router()

import {
    createRefWork,
    deleteRefWork,
} from '../controllers/refwork.controller.js'

import checkAdmin from '../middlewares/checkAdmin.js'
import checkHeader from '../middlewares/checkHeader.js'

refworkRoutes.post('/create-refwork', checkHeader, checkAdmin, createRefWork)
refworkRoutes.delete('/:id', checkHeader, checkAdmin, deleteRefWork)

export default refworkRoutes
