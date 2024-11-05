import React from 'react';
import { Footers, Left, Right } from '../../style/StyledComponent';
import { Link, useLocation } from 'react-router-dom';
import { Desktop, Mobile } from '../../hooks/useMediaQuery';

const Footer = () => {
    const location = useLocation();

    // 모바일에서 `/` 또는 `/main`일 때는 Footer를 숨김
    const isHiddenOnMobile = location.pathname === '/' || location.pathname === '/main';

    return (
        <>
            <Desktop>
                <Footers>
                    <Left>
                        COPYRIGHT © 글샘문학회 ALL RIGHTS RESERVED
                    </Left>
                    <Right>
                        <Link to='/admin/manage'>관리자페이지</Link>
                        <a href='https://www.instagram.com/hongik_geulsaem/'>
                            인스타그램
                        </a>
                        이용약관
                    </Right>
                </Footers>
            </Desktop>
            {!isHiddenOnMobile && (
                <Mobile>
                    <Footers>
                        <div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            COPYRIGHT © 글샘문학회 ALL RIGHTS RESERVED
                        </div>
                    </Footers>
                </Mobile>
            )}
        </>
    );
};

export default Footer;
