import React from 'react';
import { Left, Navs, Right, NavContent } from '../style/StyledComponent';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Navs>
            <NavContent>
                <Left>
                    <ul>
                        <li><Link to={'/main'}>1 글샘문학회</Link></li>
                        <li><Link to={'/work'}>2 작품</Link></li>
                        <li><Link to={'/critic'}>3 합평회</Link></li>
                        <li><Link to={'/archive'}>4 문집ㆍ포스터</Link></li>
                    </ul>
                </Left>
                <Right>
                    <ul>
                        <li>
                            <a href='https://www.instagram.com/hongik_geulsaem/'>
                                인스타
                            </a>
                        </li>
                        <li>i</li>
                    </ul>
                </Right>
            </NavContent>
        </Navs>
    );
};

export default Navbar;