import dotenv from 'dotenv'
dotenv.config();

import express, { json } from 'express';
const port = process.env.PORT;
import cors from 'cors';
import connectDB from './config/conn.js';
import { default as mongoose } from 'mongoose';
const app = express();
import UserRoutes from './routes/UserRoutes.js'
// db connecting here
connectDB();

// using middleware here
app.use(cors());
app.use(json());

// calling our http request here
app.use('/api', UserRoutes)

// here we are calling our server to connect 
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(port, (err) => {
        if (err) {
            console.log(`error in running the server: ${err}`)
        }
        console.log(`server is running on port: ${port}`);
    })
})

