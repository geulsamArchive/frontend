import React, { useState, useEffect } from 'react';
import { Page, Document, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';


function PDFView({ data }) {
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    });


    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const pdfstyle = {
        width: '500px',
        display: 'flex',
    }

    return (
        <div>
            발간일:{data.date}
            디자인:{data.name}
            판형:{data.bookSize}
            {data.pages}쪽
            <div>
                <Document file={data.pdf} onLoadSuccess={onDocumentLoadSuccess}>
                    <div style={pdfstyle}>
                        <Page pageNumber={pageNumber} width={400} />
                        <Page pageNumber={pageNumber + 1} width={400} />
                    </div>
                </Document>
            </div>
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