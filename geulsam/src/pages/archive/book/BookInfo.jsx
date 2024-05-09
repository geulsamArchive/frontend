import React, { useEffect, useState } from 'react';
import PDFView from '../../../components/pdf/PDFView';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const info = {
    date: "2022년 12월 1일",
    name: "정성훈",
    bookSize: "A4",
    pages: 10,
    pdf: "",
}

const BookInfo = () => {
    const [bookData, setBooktData] = useState({})
    const [loading, setLoading] = useState(true)
    const bookId = useParams();


    const getBookData = async () => {
        try {
            const resp = await axios.get('' + bookId)
            setBooktData(resp.data);
            setLoading(false);
        } catch (error) {
            console.error('api fetching error', error)
        }
    }

    useEffect(() => {
        getBookData()
    }, []
    )

    return (
        <>
            <PDFView data={info} />
        </>
    );
};

export default BookInfo;