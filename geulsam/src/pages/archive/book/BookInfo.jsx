import React, { useEffect, useState } from 'react';
import PDFView from '../../../components/pdf/PDFView';
import { useNavigate, useParams } from 'react-router-dom';
import { ViewerAndLinks, BookInfoContainer, BookTitle, BookInfos, BookInfoContents, BookInfoAndButton, BookButtons, URLButton, NoneLinkBookInfos } from '../../../style/StyledComponent';
import CopyURL from '../../../components/CopyURL/CopyURL';
import PDFDownload from '../../../components/Download/PDFDownload';
import { normalAPI } from '../../../apis/Api';
import { Desktop, Mobile } from '../../../hooks/useMediaQuery';

const BookInfo = () => {
    const [bookData, setBooktData] = useState({})
    const [loading, setLoading] = useState(true)
    const { bookId } = useParams()


    const navigate = useNavigate();
    const onClickList = () => {
        navigate('/archive/book')
    }

    const getBookData = async () => {
        try {
            const resp = await normalAPI.get(`/book/${bookId}`)
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
                        <PDFView PDF={bookData.url} />
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