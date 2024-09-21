import pool from "../database/db_connection.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils/generate_token.js";


export const userRegisterController = async (request,response) => {
    const user_profile = request.file;
    const { username,email,password,balance } = request.body;
    console.log(user_profile.filename)
    ;
    

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
