import express from 'express';
import { config } from 'dotenv';
import pool from './src/database/db_connection.js';
import authRoute from './src/routes/authenticationRoutes.js';
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


app.listen(port , () => {
    console.log(`Server is running on http://localhost:${port}`);
})









