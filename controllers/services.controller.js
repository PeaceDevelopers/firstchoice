import Service from '../models/service.model.js'
import serviceSchema from '../validations/service.schema.js'

export const getCompanies = async (req, res) => {
    try {
        const services = await Service.find()
        res.status(201).json({
            success: true,
            data: services,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const createService = async (req, res) => {
    try {
        const { error } = serviceSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            })
        }
        if (req.body.cost_price == 0) {
            return res.status(400).json({
                success: false,
                message: 'Cost price cannot be zero',
            })
        }

        const service = await Service.create(req.body)

        return res.status(201).json({
            success: true,
            data: service,
            message: 'Service created successfully',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const editService = async (req, res) => {
    try {
        const id = req.params.id
        const service = await Service.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: req.body.name,
                    cost_price: req.body.cost_price,
                },
            },
            {
                new: true,
            },
        )

        if (!service) {
            return res.status(400).json({
                success: false,
                message: 'Error creating service',
            })
        }

        console.log(service)

        return res.status(201).json({
            success: true,
            data: service,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id
        const service = Service.findByIdAndDelete(serviceId)

        if (service) {
            return res.status(200).json({
                success: true,
                message: 'Service deleted successfully',
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
