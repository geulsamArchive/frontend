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
                    <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.69531 9.01671L14.0009 17.3223M14.0009 17.3223L22.3064 9.01671M14.0009 17.3223L14.0009 2.37227" stroke="#575655" stroke-width="2.9" stroke-linecap="round" />
                        <path d="M2.37305 19.7778L2.37305 21.4389C2.37305 23.2738 3.86046 24.7612 5.69527 24.7612L22.3064 24.7612C24.1412 24.7612 25.6286 23.2738 25.6286 21.4389V19.7778" stroke="#575655" stroke-width="3.3" stroke-linecap="round" />
                    </svg>

                </Desktop>
                <Mobile>
                    다운로드
                </Mobile>
            </URLButton>
        </>
    );

}



export default PDFDownload;