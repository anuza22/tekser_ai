import 'dotenv/config';
import express, { Request, Response } from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';
import cors from 'cors';
import multer from 'multer';
import * as fs from 'fs';
import mongoose from 'mongoose';


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(logger);
app.use(express.json());

let uploadCount = 1;

app.use(cors());
app.use(express.json());

app.get('/api/upload-count', (req, res) => {
  res.json({ uploadCount });
});

app.post('/api/increment-upload-count', (req, res) => {
  uploadCount++;
  res.sendStatus(200);
});

// app.post('/upload', upload.array('files', 5), async (req: Request, res: Response) => {
//   if (!req.files) {
//     return res.status(400).send('No files uploaded.');
//   }

//   const files = req.files as unknown as express.Multer.File[];
//   const s3Service = S3Service.getInstance();

//   try {
//     const uploadPromises = files.map(file =>
//       s3Service.uploadFile(file.path, file.filename)
//     );
//     const urls = await Promise.all(uploadPromises);

//     // Clean up local files
//     files.forEach(file => fs.unlinkSync(file.path));

//     res.status(200).json({ urls });
//   } catch (error) {
//     console.error('Error uploading to S3:', error);
//     res.status(500).send('Error uploading files.');
//   }
// });

// CORS setup
const corsOptions = {
    origin: 'https://aisun-lsgb.vercel.app', // URL вашего фронтенда
    // origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

app.use('/api/v1', globalRouter);

app.listen(PORT, () => {
    console.log(`Server runs at http://localhost:${PORT}`);
});