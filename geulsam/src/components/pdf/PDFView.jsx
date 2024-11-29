import React, { useState, useEffect } from 'react';
import { Page, Document, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Centering, PDFPage } from '../../style/StyledComponent';
import {
  Button,
  PageInput,
  PDFViewerContainer,
  Spaceb,
} from '../../style/PDFViewer';

function PDFView({ PDF }) {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputValue, setInputValue] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePageInput = (e) => {
    setInputValue(e.target.value);
  };

  const handlePageInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const page = Number(inputValue);
      if (page >= 1 && page <= numPages) {
        setPageNumber(page);
      } else {
        setInputValue(pageNumber);
      }
    }
  };

  const handleRangeChange = (e) => {
    const page = Number(e.target.value);
    setPageNumber(page);
    setInputValue(page);
  };

  return (
    <PDFViewerContainer>
      <Document file={PDF} onLoadSuccess={onDocumentLoadSuccess}>
        <PDFPage
          pageNumber={pageNumber}
          canvasBackground="rgba(235, 235, 235, 1)"
        />
      </Document>
      <Spaceb>
        <input
          type="range"
          min="1"
          max={numPages}
          value={pageNumber}
          onChange={handleRangeChange}
          style={{ width: '70%' }}
        />
        <Centering>
          <Button
            onClick={() => {
              const newPage = pageNumber > 1 ? pageNumber - 1 : 1;
              setPageNumber(newPage);
              setInputValue(newPage);
            }}
          >
            <svg
              width="12"
              height="19"
              viewBox="0 0 12 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.6839 16.2533L2.8418 9.41119L9.6839 2.56909"
                stroke="#575655"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </Button>
          &nbsp;&nbsp;
          <PageInput
            value={inputValue}
            onChange={handlePageInput}
            onKeyDown={handlePageInputKeyDown}
            min="1"
            max={numPages}
          />
          /{numPages}
          &nbsp;&nbsp;
          <Button
            onClick={() => {
              const newPage =
                pageNumber + 1 <= numPages ? pageNumber + 1 : numPages;
              setPageNumber(newPage);
              setInputValue(newPage);
            }}
          >
            <svg
              width="12"
              height="19"
              viewBox="0 0 12 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.3161 16.2533L9.1582 9.41119L2.3161 2.56909"
                stroke="#575655"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </Button>
        </Centering>
      </Spaceb>
    </PDFViewerContainer>
  );
}

export default PDFView;
