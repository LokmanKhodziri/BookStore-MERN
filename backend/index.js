import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/booksRoute.js';


const app = express();

// Middleware for pasing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: Allow All Origin with default of cors
app.use(cors());
// Option: Allow Custom Origin
// app.use(cors({
//     origin: 'http://127.0.0.1:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// })
// );

app.use('/books', booksRoute);

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('MERN BookStore');
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });