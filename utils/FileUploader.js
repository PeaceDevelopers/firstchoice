import { Storage } from '@google-cloud/storage'

const storage = new Storage({
    projectId: 'firstchoice-418310',
    keyFilename: 'service-key.json',
})

export const uploadSingle = async (filePath, fileName) => {
    try {
        const gc = storage.bucket('firstchoicemanagement')
        const storagePath = `${fileName}`

        const result = await gc.upload(filePath, {
            destination: storagePath,
            gzip: true,
            public: true,
        })
        const dataToReturn = {
            fileName: fileName,
            url: result[0].publicUrl(),
        }
        console.log('File Uploaded')
        return dataToReturn
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const deleteFile = async (fileName) => {
    try {
        const gc = storage.bucket('firstchoicemanagement')
        const storagePath = `${fileName}`
        await gc.file(storagePath).delete({ ignoreNotFound: true })
        console.log('File Deleted')
        return true
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
