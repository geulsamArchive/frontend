import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';





const Book = () => {
    const [bookList, setBookList] = useState([])

    const getBookList = async () => {
        try {
            const resp = await axios.get('https://jsonplaceholder.typicode.com/photos')
            setBookList(resp.data);
            console.log(bookList)
        } catch (error) {
            console.error('api fetching failed', error)
        }
    }

    useEffect(() => {
        getBookList()
    }, [])

    return (
        <>
            문집페이지
            <div>
                <ul>
                    {bookList.map((book) => (
                        <li key={book.id}>
                            <Link to={`/archive/book/${book.id}`}>
                                <img src={book.thumbnailUrl} alt='' />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Book;