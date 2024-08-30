import React from 'react';
import { Footers, Icons, Left, Right } from '../../style/StyledComponent';
import instagram from '../../assets/images/insta.png'
import info from '../../assets/images/information.png'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Footers>
            <Left>
                COPYRIGHT © 글샘문학회 ALL RIGHTS RESERVED
            </Left>
            <Right>
                <Link to='/admin/manage'>관리자페이지</Link>

                <a href='https://www.instagram.com/hongik_geulsaem/'>
                    <Icons src={instagram} />
                </a>
                <Icons src={info} />
            </Right>
        </Footers>

    );
};
export default Footer