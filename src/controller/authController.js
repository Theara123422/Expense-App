import pool from "../database/db_connection.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils/generate_token.js";
import isPasswordVerified from "../utils/verify_password.js";


export const userRegisterController = async (request,response) => {
    const user_profile = request.file;
    const { username,email,password,balance } = request.body;
    console.log(user_profile.filename);
    

    if(!username && !email && !password && !balance) {
        return response.status(500).json({
            message : 'Invalid Data'
        })
    }
    //random
    const randomNumber = await bcrypt.genSalt(10);
    //password
    const hashedPassword = await bcrypt.hash(password,randomNumber);


    pool.query(`INSERT INTO user (username,email,password,balance,profile_image) VALUES (?,?,?,?,?)`,[username,email,hashedPassword,balance,user_profile.filename],(error,result) => {
        if(error){
            return response.status(500).json({
                message : 'Something went wrong'
            })
        }
        response.status(200).json({
            token : generateToken({username}),
            message : "Register Success"
        })
    });
}

export const userLoginController = async (request,response) => {
    const {email , password} = request.body;

    if(!email && !password){
        return response.status(500).json({
            message : "Invaild Data"
        })
    }

    pool.query(`SELECT * FROM user WHERE email = ?`,[email],(error,row) => {
        if(error){
            return response.status(500).json({
                message : 'Something went wrong'
            })
        }
        if(row){
            const isPasswordVerify = isPasswordVerified(password , row[0].password); 
            if(!isPasswordVerify){
                return response.status(500).json({
                    message : 'Wrong Password'
                })
            }
            const username = row[0].username;
            return response.status(200).json({
                token : generateToken({username}),
                message : "Login Success"
            })
        }
    })
}
