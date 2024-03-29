import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5050/books/${id}`)
            .then((response) => {
                const { data } = response;
                console.log('Response:', response);

                if (data && data.data && data.data.title && data.data.author && data.data.publishYear) {
                    setTitle(data.data.title);
                    setAuthor(data.data.author);
                    setPublishYear(data.data.publishYear);
                } else {
                    console.error('Invalid response format for book details:', data);
                    enqueueSnackbar('The requested book was not found.', {
                        variant:
                            'success'
                    });
                    // Redirect to home page or previous page
                    navigate('/');
                }

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);

                if (error.response && error.response.status === 404) {
                    enqueueSnackbar('error', { variant: 'error' });
                    navigate('/');
                } else {
                    enqueueSnackbar('Error', { variant: 'error' });
                    console.error(error);
                }
            });
    }, [id, navigate]);



    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        };

        setLoading(true);
        axios
            .put(`http://localhost:5050/books/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
                enqueueSnackbar('Book edited successfully', { variant: 'success' });
            })
            .catch((error) => {
                setLoading(false);
                if (error.response) {
                    console.error('Server responded with an error:', error.response.data);
                    console.error('Status code:', error.response.status);
                    console.error('Headers:', error.response.headers);
                } else if (error.request) {
                    console.error('No response received. The request was made:', error.request);
                } else {
                    console.error('Error setting up the request:', error.message);
                }
                enqueueSnackbar('Error editing the book', { variant: 'error' });
            });
    };


    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input
                        type="number"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditBooks