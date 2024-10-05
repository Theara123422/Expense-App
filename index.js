import express from 'express';
import { config } from 'dotenv';
import pool from './src/database/db_connection.js';
import authRoute from './src/routes/authenticationRoutes.js';
import verifyToken from './src/utils/verify_token.js';
import userRouter from './src/routes/userRoutes.js';
config();
const app = express();
const port= process.env.port;
//application middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//initialize database connection 
pool.getConnection((error,connection) => {
    if(error) return console.log("Failed connection");
    console.log("Success connection");
    connection.release();
})
//authentication (public route)
app.use('/auth', authRoute);
app.use('/user',userRouter)

app.get('/' ,verifyToken, (request,response) => {
    response.send("Hello");
})


app.listen(port , () => {
    console.log(`Server is running on http://localhost:${port}`);
})









