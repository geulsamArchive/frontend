import React, { useEffect, useState } from 'react';
import PDFView from '../../../components/pdf/PDFView';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ViewerAndLinks, BookInfoContainer, BookTitle, BookInfos, BookInfoContents, BookInfoAndButton, BookButtons } from '../../../style/StyledComponent';
import CopyURL from '../../../components/CopyURL/CopyURL';
import PDFDownload from '../../../components/Download/PDFDownload';

const BookInfo = () => {
    const [bookData, setBooktData] = useState({})
    const [loading, setLoading] = useState(true)
    const { bookId } = useParams()


    const getBookData = async () => {
        try {
            const resp = await axios.get(`http://geulsaem.store:8080/book/${bookId}`)
            console.log(resp.data)
            setBooktData(resp.data.data);
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
        <BookInfoContainer>
            <BookTitle>
                {bookData.book}
            </BookTitle>
            <BookInfoAndButton>
                <BookInfoContents>
                    <BookInfos>
                        발간일
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {bookData.release}
                    </BookInfos>
                    <BookInfos>
                        디자인
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {bookData.designer}
                    </BookInfos>
                    <BookInfos>
                        판형 / 쪽수
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;
                        {bookData.plate} / {bookData.page}
                    </BookInfos>
                    <ViewerAndLinks>
                        <PDFView PDF={bookData.url} />
                    </ViewerAndLinks>
                </BookInfoContents>
                <BookButtons>
                    <br />
                    <br />
                    <PDFDownload PDFLink={bookData.url} />
                    <CopyURL />
                </BookButtons>
            </BookInfoAndButton>
        </BookInfoContainer>

    );
};

export default BookInfo;