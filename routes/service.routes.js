import express from 'express'
const serviceRoutes = express.Router()

import {
    createService,
    editService,
    deleteService,
    getCompanies,
} from '../controllers/services.controller.js'
import checkHeader from '../middlewares/checkHeader.js'
import checkAdmin from '../middlewares/checkAdmin.js'

serviceRoutes.get('/', getCompanies)
serviceRoutes.post('/service', checkHeader, checkAdmin, createService)
serviceRoutes.put('/service/:id', checkHeader, checkAdmin, editService)
serviceRoutes.delete('/:id', checkHeader, checkAdmin, deleteService)
export default serviceRoutes
