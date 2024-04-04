import express from 'express'

const companyRoutes = express.Router()
import checkAdmin from '../middlewares/checkAdmin.js'
import checkHeader from '../middlewares/checkHeader.js'

import multer from 'multer'

import {
    createCompany,
    editCompany,
    getCompany,
    getCompanies,
    deleteCompany,
    getEmployeesOfCompany,
} from '../controllers/company.controller.js'

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

export default companyRoutes
