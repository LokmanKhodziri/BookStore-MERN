import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';

const app = express();

// Middleware for pasing request body
app.use(express.json());

//MIddleware for handling CORS POLICY
//Option 1: Allow All Origin with default of cors
app.use(cors());
//Option : Allow Custom Origin
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// })
// );

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('MERN BookStore');
});

app.use('/books', booksRoute);

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