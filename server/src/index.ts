import 'dotenv/config';
import express, { Request, Response } from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';
import cors from 'cors';
import multer from 'multer';
import * as fs from 'fs';
import mongoose from 'mongoose';
import { loginToKundelik } from './kundelik/kundelik-service';
import bodyParser from 'body-parser';
import { KunAPI } from './auth/kundelik-api';
import { Annotation, annotateImage } from './gpt/test';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(logger);
app.use(express.json());
app.use(bodyParser.json());


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

// CORS setup
const corsOptions = {
    origin: 'https://aisun-vy43.vercel.app', // URL вашего фронтенда
    // origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

app.use('/api/v1', globalRouter);

app.listen(PORT, () => {
    console.log(`Server runs at http://localhost:${PORT}`);
});

// loginToKundelik('ibadullaevmanas', 'Superboy_2001')
// .then(() => console.log('Process completed'))
// .catch(error => console.error('Process failed:', error));


// (async () => {
//   const login = 'ibadullaevmanas';
//   const password = 'Superboy_2001';
//   // const login = 'gazhapakturin';
//   // const password = 'Aklima1982';

//   try {
//     const api = new KunAPI(login, password);

//     // Wait for the initialization to complete
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const schoolInfo = await api.getSchool();
//     console.log('School Info:', schoolInfo);

//     const userInfo = await api.getInfo();
//     console.log('User Info:', userInfo);

//     const eduGroups = await api.getEduGroups();
//     console.log("edu Groups:", eduGroups);

//     const myClassmates = await api.getClassmates();
//     console.log('My Classmates: ' , myClassmates);

//     const context = await api.getContext();
//     console.log('context:', context);

//     const myClasses = await api.getEduGroups();
//     console.log(myClasses);

    
//     // const organizations = api.getOrganizations();
//     // console.log("Organosation", organizations);

//     // console.log('OrganisationInfo', api.getOrganizationInfo(organizations[0]));

//     // console.log('User Context: ', await api.getSchools());

//     // const userEduGroups = await api.getUserEduGroups(1000013590798);
//     // console.log('userEduGroups', userEduGroups);

//     // const pupils = await api.getStudentsGroupsList();
//     // console.log("groupPupils", pupils);





//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();


// Пример использования
// (async () => {
//   const annotations: Annotation[] = [
//     { position: { x: 50, y: 30 }, text: 'Correct', color: 'green' },
//     { position: { x: 50, y: 100 }, text: 'Incorrect', color: 'red' }
//   ];

//   const imagePath = './src/math.jpg';
//   const outputPath = './out.jpg';

//   try{
//     await annotateImage(imagePath, outputPath, annotations);}
//     catch(e){
//       console.error(e);
//     }
// })();


