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

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, //
};

app.use(cors(corsOptions));


app.use('/api/auth', authRoutes);

app.listen(port, () =>{
    connectDB(MONGODB_URI);
    console.log(`Server is running at port ${port}`)
})


