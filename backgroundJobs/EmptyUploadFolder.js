import cron from 'node-cron'
import fs from 'fs'
import path from 'path'

export const scheduleEmptyUploadFolderJob = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            const directoryPath = 'uploads'
            const files = fs.readdirSync(directoryPath)

            files.forEach((file) => {
                const filePath = path.join(directoryPath, file)
                fs.unlinkSync(filePath)
            })

            console.log('All files in the uploads directory have been removed.')
        } catch (error) {
            console.error('Error running empty upload folder job:', error)
        }
    })
}
