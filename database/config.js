const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL).catch((err) => {
    console.log(err)
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})
