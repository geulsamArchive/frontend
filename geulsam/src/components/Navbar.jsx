import React from 'react';
import { Left, Navs, NavContent, NavLink } from '../style/StyledComponent';

const Navbar = () => {
    return (
        <Navs>
            <NavContent>
                <Left>
                    <ul>
                        <li>
                            <NavLink to={'/main'}>
                                1 글샘문학회
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/work'}>
                                2 작품
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/critic'}>
                                3 합평회
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/archive/poster'}>
                                4 문집ㆍ포스터
                            </NavLink>
                        </li>
                    </ul>
                </Left>
            </NavContent>
        </Navs>
    );
};

export default Navbar;