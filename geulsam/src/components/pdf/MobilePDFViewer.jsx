import React, { useState, useEffect } from 'react';
import { Page, Document, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Centering, PageRow, PDFPage } from '../../style/StyledComponent';
import { Button, MobilePdfPage, MobilePDFViewerContainer, PageInput, PDFViewerContainer, Spaceb, SpaceBot } from '../../style/PDFViewer';

function MobilePDF({ PDF }) {
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, []); // useEffect에 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 수정.

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [inputValue, setInputValue] = useState(1); // 입력 필드 값을 저장할 상태.

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handlePageInput = (e) => {
        const value = Math.max(1, Math.min(numPages, Number(e.target.value))); // 유효 범위 내 값으로 보정.
        setInputValue(value);
    };

    const handlePageInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            setPageNumber(inputValue); // Enter 키 입력 시 페이지 변경.
        }
    };

    const handleRangeChange = (e) => {
        const page = Number(e.target.value);
        setPageNumber(page);
        setInputValue(page); // 슬라이더 변경 시 입력 필드도 업데이트.
    };

    return (
        <MobilePDFViewerContainer>
            <Document file={PDF} onLoadSuccess={onDocumentLoadSuccess}>
                <MobilePdfPage pageNumber={pageNumber} canvasBackground="rgba(235, 235, 235, 1)" />
            </Document>
            <SpaceBot>
                <Button onClick={() => {
                    const newPage = pageNumber > 1 ? pageNumber - 1 : 1;
                    setPageNumber(newPage);
                    setInputValue(newPage); // 입력 필드 동기화.
                }}>
                    <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.68439 15.9473L2.84229 9.10516L9.68439 2.26305" stroke="#F9F9F6" stroke-width="4" stroke-linecap="round" />
                    </svg>
                </Button>
                &nbsp;&nbsp;
                <div>
                    <PageInput
                        value={inputValue}
                        onChange={handlePageInput}
                        onKeyDown={handlePageInputKeyDown}
                        min="1"
                        max={numPages}
                    />/{numPages}
                </div>
                &nbsp;&nbsp;
                <Button onClick={() => {
                    const newPage = pageNumber < numPages ? pageNumber + 1 : numPages;
                    setPageNumber(newPage);
                    setInputValue(newPage); // 입력 필드 동기화.
                }}>
                    <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.31561 15.9473L9.15771 9.10516L2.31561 2.26305" stroke="#F9F9F6" stroke-width="4" stroke-linecap="round" />
                    </svg>

                </Button>
            </SpaceBot>
        </MobilePDFViewerContainer>
    );
};

export default MobilePDF;
