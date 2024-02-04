import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for pasing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('MERN BookStore');
});

//Route for save new book
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publisYear
        ) {
            return response.status(400).send({
                message: 'Send all requred fields: title, authot, publisYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publisYear: request.body.publisYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get All Book from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
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