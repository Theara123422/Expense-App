import pool from "../database/db_connection.js";
export const GetAuthUserInformation = (request,response) => {
    const authUser = request.user;

    pool.query('SELECT * FROM user WHERE username = ?',authUser,(error,row) => {
        if(error) {
            return response.status(500).json({
                message : "Something went wrong"
            })
        }
        response.status(200).json({
            message : "Get User Success",
            data : row
        })
    })
}