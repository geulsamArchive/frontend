import React, { useEffect, useState } from 'react';
import PDFView from '../../../components/pdf/PDFView';
import { useNavigate, useParams } from 'react-router-dom';
import { BookIndexButtonTop, Button, BookIndexAlign, BookIndexHeader, CloseButton, AnimatedBookIndexList, BookIndexButton, BookIndex, BookIndexList, ViewerAndLinks, BookInfoContainer, BookTitle, BookInfos, BookInfoContents, BookInfoAndButton, BookButtons, URLButton, NoneLinkBookInfos } from '../../../style/StyledComponent';
import CopyURL from '../../../components/CopyURL/CopyURL';
import PDFDownload from '../../../components/Download/PDFDownload';
import { normalAPI } from '../../../apis/Api';
import { Desktop, Mobile } from '../../../hooks/useMediaQuery';
import { BookCover, BookCoverContainer } from '../../../style/Book';

const BookInfo = () => {
    const [bookData, setBooktData] = useState({})
    const [loading, setLoading] = useState(true)
    const { bookId } = useParams()
    const [bookIndexList, setBookIndexList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

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

    const toggleList = () => {
        setIsOpen(!isOpen);
    };

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
                            <BookCoverContainer>
                                <BookCover src={bookData.bookCover} />
                            </BookCoverContainer>
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
            <BookIndexList isOpen={isOpen}>
                {bookIndexList.map((book) => (
                    <BookIndex key={book.bookContentId} onClick={() => handleWorkClick(book.contentId)}>
                        {book.page}&nbsp;&nbsp;{book.name}&nbsp; &middot; &nbsp;{book.title}
                    </BookIndex>
                ))}
            </BookIndexList>
            <Mobile >
                <PDFDownload PDFLink={bookData.url} />
                <CopyURL />
                <URLButton onClick={onClickList}>
                    목록
                </URLButton>
                {!isOpen &&
                    <BookIndexButton onClick={toggleList}>
                        &nbsp;&nbsp;&nbsp;목차
                    </BookIndexButton>
                }
                {isOpen &&
                    <AnimatedBookIndexList isOpen={isOpen}>
                        <BookIndexHeader>
                            <BookIndexButtonTop onClick={toggleList}>
                                최근 공개된 작품들
                            </BookIndexButtonTop>
                            <CloseButton onClick={() => setIsOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.5002 21.1752C10.2297 21.1752 8.97156 20.9249 7.79773 20.4387C6.62391 19.9525 5.55734 19.2399 4.65894 18.3415C3.76053 17.443 3.04787 16.3765 2.56166 15.2027C2.07545 14.0288 1.8252 12.7707 1.8252 11.5002C1.8252 10.2297 2.07545 8.97156 2.56166 7.79773C3.04788 6.62391 3.76053 5.55734 4.65894 4.65894C5.55735 3.76053 6.62391 3.04787 7.79773 2.56166C8.97156 2.07545 10.2297 1.8252 11.5002 1.8252C12.7707 1.8252 14.0288 2.07545 15.2027 2.56166C16.3765 3.04788 17.443 3.76053 18.3415 4.65894C19.2399 5.55735 19.9525 6.62391 20.4387 7.79774C20.9249 8.97156 21.1752 10.2297 21.1752 11.5002C21.1752 12.7707 20.9249 14.0288 20.4387 15.2027C19.9525 16.3765 19.2399 17.443 18.3415 18.3415C17.443 19.2399 16.3765 19.9525 15.2027 20.4387C14.0288 20.9249 12.7707 21.1752 11.5002 21.1752L11.5002 21.1752Z" stroke="#81807F" stroke-width="1.8" stroke-linecap="round" />
                                    <path d="M8.2749 8.2749L14.7249 14.7249" stroke="#81807F" stroke-width="1.86" stroke-linecap="round" />
                                    <path d="M14.7251 8.2749L8.2751 14.7249" stroke="#81807F" stroke-width="1.86" stroke-linecap="round" />
                                </svg></CloseButton>
                        </BookIndexHeader>
                        <br />
                        <br />
                        <br />
                        <BookIndexAlign>
                            {bookIndexList.map((book) => (
                                <BookIndex key={book.bookContentId} onClick={() => handleWorkClick(book.contentId)}>
                                    {book.page}&nbsp;&nbsp;{book.name}&nbsp; &middot; &nbsp;{book.title}
                                </BookIndex>
                            ))
                            }
                        </BookIndexAlign>
                    </AnimatedBookIndexList>
                }
            </Mobile>
        </BookInfoContainer>

    );
};

export default BookInfo;