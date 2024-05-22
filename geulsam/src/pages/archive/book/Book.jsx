import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const apiEndpoint = "http://3.38.162.235:8080/book"


const Book = () => {
    const [bookList, setBookList] = useState([])
    const [loading, setLoading] = useState(true)
    // const [currentPage, setCurrentPage] = useState(1)
    // const [bookPerPage, setBookPerPage] = useState(12)

    const getBookList = async () => {
        try {
            const resp = await axios.get(apiEndpoint)
            console.log(resp.data.data)
            setBookList(resp.data.data);
            setLoading(false)
        } catch (err) {
            console.log('api fetching failed', err)
        }
    }

    useEffect(() => {
        getBookList()
    }, [])

    return (
        <>
            <div>
                문집페이지

                <ul>
                    {bookList.map((book) => (
                        <li key={book.id}>
                            <Link to={`/archive/book/${book.bookId}`}>
                                <img src={book.bookCover} alt={book.description} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Book;