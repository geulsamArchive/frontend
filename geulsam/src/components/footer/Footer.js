import React from 'react';
import { Footborder, Footers, Icons, Left, Right } from '../../style/StyledComponent';
import info from '../../assets/images/information.png'
import { Link } from 'react-router-dom';
import { Desktop, Mobile } from '../../hooks/useMediaQuery';

const Footer = () => {
    return (
        <Footers>
            <Desktop>
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
            </Desktop>
            <Mobile>
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
            </Mobile>
        </Footers>

    );
};
export default Footer