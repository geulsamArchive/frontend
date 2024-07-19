import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookcover, BookcoverImg, GridContainer, GridItems } from '../../../style/StyledComponent';
import Pagination from '../../../components/Paging/Pagination';





const Book = () => {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const apiEndpoint = `http://geulsaem.store:8080/book?page=${page}`

    const [bookList, setBookList] = useState([])

    const [loading, setLoading] = useState(true)

    const getBookList = async () => {
        try {
            const resp = await axios.get(apiEndpoint)
            console.log(resp.data.data)
            setBookList(resp.data.data.content);
            setTotalPage(resp.data.data.pageTotal)
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
            <GridContainer>
                {bookList.map((book) => (
                    <GridItems key={book.id}>
                        <Bookcover to={`/archive/book/${book.bookId}`}>
                            <BookcoverImg src={book.thumbNail} alt={book.description} />
                        </Bookcover>
                    </GridItems>
                ))}
            </GridContainer>
            <Pagination page={page} totalPage={totalPage} onChangePage={setPage} />
        </>
    );
};

export default Book;
