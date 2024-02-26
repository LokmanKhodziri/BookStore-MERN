import express from 'express';
import { Book } from "../models/bookModel.js";
import mongoose from 'mongoose';

const router = express.Router();

// Route for save new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get All Books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ data: books });
    } catch (error) {
        console.error('Error fetching all books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for Get a specific book by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log('Received ID:', id); // Add this line
    try {
        // Validate if the received ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ObjectId format' });
        }

        const objectId = new mongoose.Types.ObjectId(id);
        const book = await Book.findById(objectId);
        console.log('Book:', book); // Add this line
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ data: book });
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


// Route for Update a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all requirement fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book Deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
