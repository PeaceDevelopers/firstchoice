const express = require('express')
const companyRoutes = express.Router()
const checkAdmin = require('../middlewares/checkAdmin')
const { checkHeader } = require('../middlewares/checkHeader')

const multer = require('multer')

const {
    createCompany,
    editCompany,
    getCompany,
    getCompanies,
    deleteCompany,
    getEmployeesOfCompany,
} = require('../controllers/company.controller')

const upload = multer({
    dest: (req, file, cb) => {
        cb(null, 'uploads/')
    },

    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'application/pdf'
        ) {
            cb(null, true)
        } else {
            cb(
                new multer.MulterError(
                    'LIMIT_UNEXPECTED_FILE',
                    'File type not supported',
                ),
                false,
            )
        }
    },
})

const fileErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(413).send({
                success: false,
                message: 'File type not supported, only jpeg, png, pdf',
            })
        }
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res
                .status(413)
                .send({ success: false, message: err.message })
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res
                .status(413)
                .send({ success: false, message: err.message })
        }
        if (err.code === 'LIMIT_FIELD_KEY') {
            return res
                .status(413)
                .send({ success: false, message: err.message })
        }
    }
    next(err)
}

companyRoutes.post(
    '/create-company',
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'documents', maxCount: 7 },
    ]),
    fileErrorHandler,
    createCompany,
)

companyRoutes.put(
    '/edit-company/:id',
    checkHeader,
    checkAdmin,
    upload.single('logo'),
    fileErrorHandler,
    editCompany,
)
companyRoutes.get('/get-company/:id', checkHeader, getCompany)
companyRoutes.get('/companies', checkHeader, checkAdmin, getCompanies)
companyRoutes.delete('/:id', checkHeader, deleteCompany)
companyRoutes.get('/:id/employees', checkHeader, getEmployeesOfCompany)

module.exports = companyRoutes
