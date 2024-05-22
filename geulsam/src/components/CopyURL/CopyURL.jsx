import React from 'react';
import { useLocation } from 'react-router-dom';
import { URLButton } from '../../style/StyledComponent';
import Logo from '../../assets/images/URL.png'

const CopyURL = () => {
    const baseURL = "localhost:3000/"
    const location = useLocation();
    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("해당 페이지의 URL이 복사되었어요.");
        } catch (err) {
            alert.error("URL 복사에 실패하였습니다.");
        }
    };
    return (
        <>
            <URLButton onClick={() => handleCopyClipBoard(`${baseURL}${location.pathname}`)}>
                <img src={Logo} alt='현재 URL 복사' />
            </URLButton>
        </>
    );
};

export default CopyURL;