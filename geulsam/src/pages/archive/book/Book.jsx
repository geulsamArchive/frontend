import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookcover, BookcoverImg, GridContainer, GridItems } from '../../../style/StyledComponent';
import Pagination from '../../../components/Paging/Pagination';
import { normalAPI } from '../../../apis/Api';





const Book = () => {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)


    const [bookList, setBookList] = useState([])

    const [loading, setLoading] = useState(true)

    const getBookList = async () => {
        try {
            const resp = await normalAPI.get(`/book?page=${page}`)
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
                            <BookcoverImg src={book.bookCover} alt={book.description} />
                        </Bookcover>
                    </GridItems>
                ))}
            </GridContainer>
            <Pagination page={page} totalPage={totalPage} onChangePage={setPage} />
        </>
    );
};

export default Book;
