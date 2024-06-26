import 'dotenv/config';
import express, { Request, Response } from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';
import cors from 'cors';
import multer from 'multer';


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

const upload = multer();


// Middleware
app.use(logger);
app.use(express.json());

// app.post("/upload", upload.array("files", 5), (req, res) => {
//     // req.files now contains the array of uploaded files
//     const files = req.files as Express.Multer.File[];
    
//     // Process or upload files as needed
//     res.json({ files: files.map(file => ({ filename: file.originalname })) });
//   });
  

// CORS setup
const corsOptions = {
    origin: 'http://localhost:3000', // URL вашего фронтенда
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/api/v1/', globalRouter);

app.listen(PORT, () => {
    console.log(`Server runs at http://localhost:${PORT}`);
});
