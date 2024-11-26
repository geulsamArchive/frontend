import React, { useEffect, useState } from 'react';
import PDFView from '../../../components/pdf/PDFView';
import { useNavigate, useParams } from 'react-router-dom';
import { BookIndex, BookIndexList, ViewerAndLinks, BookInfoContainer, BookTitle, BookInfos, BookInfoContents, BookInfoAndButton, BookButtons, URLButton, NoneLinkBookInfos } from '../../../style/StyledComponent';
import CopyURL from '../../../components/CopyURL/CopyURL';
import PDFDownload from '../../../components/Download/PDFDownload';
import { normalAPI } from '../../../apis/Api';
import { Desktop, Mobile } from '../../../hooks/useMediaQuery';

const BookInfo = () => {
    const [bookData, setBooktData] = useState({})
    const [loading, setLoading] = useState(true)
    const { bookId } = useParams()
    const [bookIndexList, setBookIndexList] = useState([]);


    const navigate = useNavigate();
    const onClickList = () => {
        navigate('/archive/book')
    }

    const getBookData = async () => {
        try {
            const resp = await normalAPI.get(`/book/${bookId}`)
            console.log(resp.data)
            setBooktData(resp.data.data);
            setBookIndexList(resp.data.data.bookContentResList)
            setLoading(false);
        } catch (error) {
            console.error('api fetching error', error)
        }
    }

    const handleWorkClick = (id) => {
        navigate(`/work/${id}`); // 작품 페이지로 이동
    }



    useEffect(() => {
        getBookData()
    }, []
    )

    return (
        <BookInfoContainer>
            <BookTitle>
                {bookData.title}
            </BookTitle>
            <BookInfoAndButton>
                <BookInfoContents>
                    <NoneLinkBookInfos>
                        발간일
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {bookData.release}
                    </NoneLinkBookInfos>
                    <NoneLinkBookInfos>
                        디자인
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {bookData.designer}
                    </NoneLinkBookInfos>
                    <NoneLinkBookInfos>
                        판형 / 쪽수
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;
                        {bookData.plate} / {bookData.page}
                    </NoneLinkBookInfos>
                    <ViewerAndLinks>
                        <Desktop>
                            <PDFView PDF={bookData.url} />
                        </Desktop>
                        <Mobile>
                            <img src={bookData.bookCover} />
                        </Mobile>
                    </ViewerAndLinks>
                </BookInfoContents>
                <Desktop>
                    <BookButtons>
                        <br />
                        <br />
                        <PDFDownload PDFLink={bookData.url} />
                        <CopyURL />
                    </BookButtons>
                </Desktop>
            </BookInfoAndButton>
            <BookIndexList>
                {bookIndexList.map((book) => (
                    <BookIndex key={book.bookContentId} onClick={() => handleWorkClick(book.contentId)}>
                        {book.page}&nbsp;&nbsp;{book.name}&nbsp; &middot; &nbsp;{book.title}
                    </BookIndex>
                ))}
            </BookIndexList>
            <Mobile>
                <PDFDownload PDFLink={bookData.url} />
                <CopyURL />
                <URLButton onClick={onClickList}>
                    목록
                </URLButton>
            </Mobile>
        </BookInfoContainer>

    );
};

export default BookInfo;