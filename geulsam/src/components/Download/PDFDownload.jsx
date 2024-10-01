import React from 'react';
import { URLButton } from '../../style/StyledComponent';
import Icon from '../../assets/images/down.png'
import { Desktop, Mobile } from '../../hooks/useMediaQuery';

const PDFDownload = ({ PDFLink }) => {
    const handelPDFDownload = () => {
        window.open(PDFLink, '_blank')
    }

    return (
        <>
            <URLButton onClick={handelPDFDownload}>
                <Desktop>
                    <img src={Icon} alt='PDF 다운로드' />
                </Desktop>
                <Mobile>
                    다운로드
                </Mobile>
            </URLButton>
        </>
    );

}



export default PDFDownload;