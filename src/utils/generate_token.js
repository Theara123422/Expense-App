import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();
const generateToken = (username) => {
    return jwt.sign(
        username,
        process.env.jwt_secret,
        {
            expiresIn : process.env.jwt_expired
        }
    )
}

export default generateToken;