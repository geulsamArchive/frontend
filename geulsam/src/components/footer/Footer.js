import React from 'react';
import { Footers, Icons, Left, Right } from '../../style/StyledComponent';
import instagram from '../../assets/images/insta.png'
import info from '../../assets/images/information.png'

const Footer = () => {
    return (
        <Footers>
            <Left>
                COPYRIGHT © 글샘문학회 ALL RIGHTS RESERVED
            </Left>
            <Right>
                <a href='https://www.instagram.com/hongik_geulsaem/'>
                    <Icons src={instagram} />
                </a>
                <Icons src={info} />
            </Right>
        </Footers>

    );
};
export default Footer