import React from 'react';
import PDFView from '../../components/pdf/PDFView';
import Example from '../../components/pdf/example.pdf'

const info = {
    date: "2022년 12월 1일",
    name: "정성훈",
    bookSize: "A4",
    pages: 10,
    pdf: "https://www.hongik.ac.kr/kr/newscenter/notice.do?mode=download&articleNo=94266&attachNo=49368",
}
const Archive = () => {
    return (
        <div>
            문집 & 포스터 페이지
            <PDFView data={info} />
        </div>
    );
};

export default Archive;