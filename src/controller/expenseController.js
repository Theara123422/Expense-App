import pool from "../database/db_connection.js";


export const CreateNewExpenseController = (request,response) => {
    const authUser = request.user;
    const { title,type,category,description,expense_amount } = request.body;

    if(!title && !type && !category && !description && !expense_amount ){
        return response.status(500).json({
            message : "Bad Request"
        })
    }
    pool.query(`SELECT id FROM user WHERE username = ?`,authUser,(error,row)=>{
        if(error){
            return response.status(500).json({
                message : "Something went wrong"
            })
        }
        const user_id = row[0].id;
        const insertValue = [user_id,title,type,category,description,expense_amount];
        pool.query(`INSERT INTO expense (user_id,title,type,category,description,expense_amount) VALUES(?,?,?,?,?,?)`,insertValue,(error,result)=>{
            if(error) {
                return response.status(500).json({
                    message : "Something Went Wrong"
                })
            }
            if(type.toLowerCase() == 'income'){
                const editBalanceSQL = `UPDATE user SET balance = balance + ? WHERE id = ?`;
                pool.query(editBalanceSQL,[expense_amount,user_id],(error,result)=>{
                    if(error) {
                        return response.status(500).json({
                            message : "Something Went Wrong"
                        })
                    }
                    response.status(200).json({
                        message : "Create New Expense Success"
                    })
                })
            }
            else{
                const editBalanceSQL = `UPDATE user SET balance = balance - ? WHERE id = ?`;
                pool.query(editBalanceSQL,[expense_amount,user_id],(error,result)=>{
                    if(error) {
                        return response.status(500).json({
                            message : "Something Went Wrong"
                        })
                    }
                    response.status(200).json({
                        message : "Create New Expense Success"
                    })
                })
            }
        })
    })
    


}