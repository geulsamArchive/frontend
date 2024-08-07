import React from 'react';
import { Left, Navs, NavContent, NavLink, S, ActiveNavLink } from '../style/StyledComponent';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const path = useLocation();

    return (
        <Navs>
            <NavContent>
                <Left>
                    <ul>
                        <li>
                            {path.pathname === '/main' ?
                                <ActiveNavLink to={'/main'}>
                                    <S>1</S>&nbsp;&nbsp;&nbsp;글샘문학회
                                </ActiveNavLink>
                                :
                                <NavLink to={'/main'}>
                                    <S>1</S>&nbsp;&nbsp;&nbsp;글샘문학회
                                </NavLink>}

                        </li>
                        <li>
                            {path.pathname.startsWith('/work') ?
                                <ActiveNavLink to={'/work'}>
                                    <S>2</S>&nbsp;&nbsp;&nbsp; 작품
                                </ActiveNavLink>
                                :
                                <NavLink to={'/work'}>
                                    <S>2</S>&nbsp;&nbsp;&nbsp; 작품
                                </NavLink>}
                        </li>
                        <li>
                            {path.pathname === '/critic' ?
                                <ActiveNavLink to={'/critic'}>
                                    <S>3</S>&nbsp;&nbsp;&nbsp;합평회
                                </ActiveNavLink>
                                :
                                <NavLink to={'/critic'}>
                                    <S>3</S>&nbsp;&nbsp;&nbsp;합평회
                                </NavLink>}
                        </li>
                        <li>
                            {path.pathname.startsWith('/archive') ?
                                <ActiveNavLink to={'/archive/poster'}>
                                    <S>4</S>&nbsp;&nbsp;&nbsp; 문집ㆍ포스터
                                </ActiveNavLink>
                                :
                                <NavLink to={'/archive/poster'}>
                                    <S>4</S>&nbsp;&nbsp;&nbsp; 문집ㆍ포스터
                                </NavLink>}

                        </li>
                    </ul>
                </Left>
            </NavContent>
        </Navs>
    );
};

export default Navbar;