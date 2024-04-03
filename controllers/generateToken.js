import { configDotenv } from 'dotenv'
import jwt from 'jsonwebtoken'

configDotenv()

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}

export default generateToken
