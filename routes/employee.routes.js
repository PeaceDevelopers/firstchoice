const express = require('express')
const multer = require('multer')
const employeeRoutes = express.Router()

const {
    createEmployee,
    getEmployee,
    editEmployee,
    deleteEmployeeFile,
    deleteEmployee,
    getAllEmployees,
} = require('../controllers/employee.controller')

const { checkHeader } = require('../middlewares/checkHeader')
const checkAdmin = require('../middlewares/checkAdmin')

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
employeeRoutes.post(
    '/create-employee',
    upload.array('documents'),
    checkHeader,
    checkAdmin,
    createEmployee,
)

employeeRoutes.get('/', checkHeader, checkAdmin, getAllEmployees)

employeeRoutes.get('/get-employee/:id', checkHeader, getEmployee)

employeeRoutes.put(
    '/edit-employee/:id',
    upload.array('documents'),
    checkHeader,
    checkAdmin,
    editEmployee,
)

employeeRoutes.delete(
    '/delete-file/',
    checkHeader,
    checkAdmin,
    deleteEmployeeFile,
)

employeeRoutes.delete(
    '/delete-employee/:id',
    checkHeader,
    checkAdmin,
    deleteEmployee,
)

module.exports = employeeRoutes
