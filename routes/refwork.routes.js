const express = require('express')
const refworkRoutes = express.Router()

const {
    createRefWork,
    deleteRefWork,
} = require('../controllers/refwork.controller')

const checkAdmin = require('../middlewares/checkAdmin')
const { checkHeader } = require('../middlewares/checkHeader')

refworkRoutes.post('/create-refwork', checkHeader, checkAdmin, createRefWork)
refworkRoutes.delete('/:id', checkHeader, checkAdmin, deleteRefWork)

module.exports = refworkRoutes
