import React, { useState, useEffect } from 'react';
import { Page, Document, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { PDFPage, PageRow } from '../../style/StyledComponent';


function PDFView({ PDF }) {
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    });


    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1)
    const [text, setText] = useState('')

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document file={PDF} onLoadSuccess={onDocumentLoadSuccess}>
                <PageRow>
                    <PDFPage pageNumber={pageNumber} canvasBackground='rgba(235, 235, 235, 1)' scale='1.5' />
                    {/* <PDFPage pageNumber={pageNumber + 1} canvasBackground='rgba(235, 235, 235, 1)' scale='1' /> */}
                </PageRow>
            </Document>
            <div>
                <button onClick={() => {
                    setPageNumber(pageNumber === 1 ? pageNumber : pageNumber - 2)
                }}> 이전페이지
                </button>
                <button onClick={() => {
                    setPageNumber(numPages === pageNumber ? pageNumber : pageNumber + 2)
                }}> 다음페이지
                </button>
            </div>
        </div>

    );
};

export default PDFView;