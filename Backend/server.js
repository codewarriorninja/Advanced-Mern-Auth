import express from 'express'
import cors from 'cors'
import { connectDB } from './config/dbConnection.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI
const app= express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/api/auth', authRoutes);

app.listen(port, () =>{
    connectDB(MONGODB_URI);
    console.log(`Server is running at port ${port}`)
})

//IOjlSTmMu2mNPYgR
