import RefWork from '../models/RefWork.model.js'
import refWorkSchema from '../validations/refwork.schema.js'

export const createRefWork = async (req, res) => {
    try {
        const { error } = refWorkSchema.validate(req.body)

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            })
        } else {
            const refWork = await RefWork.create(req.body)

            return res.status(201).json({
                success: true,
                data: 'Ref Work Created',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteRefWork = async (req, res) => {
    try {
        const refWork = await RefWork.findByIdAndDelete(req.params.id)

        if (!refWork) {
            return res.status(404).json({
                success: false,
                message: 'Ref Work not found',
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'Ref Work deleted successfully',
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}
