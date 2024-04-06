const express = require('express')
const serviceRoutes = express.Router()

const {
    createService,
    editService,
    deleteService,
    getCompanies,
} = require('../controllers/services.controller')
const { checkHeader } = require('../middlewares/checkHeader')
const checkAdmin = require('../middlewares/checkAdmin')

serviceRoutes.get('/', getCompanies)
serviceRoutes.post('/service', checkHeader, checkAdmin, createService)
serviceRoutes.put('/service/:id', checkHeader, checkAdmin, editService)
serviceRoutes.delete('/:id', checkHeader, checkAdmin, deleteService)

module.exports = serviceRoutes
