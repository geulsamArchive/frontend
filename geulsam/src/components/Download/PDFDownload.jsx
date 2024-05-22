import React from 'react';
import { URLButton } from '../../style/StyledComponent';
import Icon from '../../assets/images/down.png'

const PDFDownload = ({ PDFLink }) => {
    const handelPDFDownload = () => {
        window.open(PDFLink, '_blank')
    }

    return (
        <>
            <URLButton onClick={handelPDFDownload}>
                <img src={Icon} alt='PDF 다운로드' />
            </URLButton>
        </>
    );

}



export default PDFDownload;