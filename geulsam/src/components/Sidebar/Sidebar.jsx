import React from 'react';
import { SideBox, SideLink, Sidebars } from '../../style/StyledComponent';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));
    const prevpath = useLocation();



    const onClickLogout = () => {
        window.localStorage.removeItem('access');
        window.localStorage.removeItem('refresh');
        setIsAuthenticated(false);
        window.location.reload()
    };

    const onClickLogin = () => {
        localStorage.setItem('prevpath', prevpath.pathname);
        console.log(prevpath);
    }

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('access'));
    }, []);

    return (
        <Sidebars>
            {isAuthenticated
                ?
                <>
                    <SideBox>
                        <SideLink to='/work/upload'>
                            작품올리기
                        </SideLink>
                    </SideBox>
                    <SideBox>
                        <SideLink onClick={onClickLogout}>
                            로그아웃
                        </SideLink>
                    </SideBox>
                    <SideBox>
                        <SideLink to='/user/mypage'>
                            마이페이지
                        </SideLink>
                    </SideBox>
                </>
                :
                <>
                    <SideBox>
                        <SideLink to="/login" onClick={onClickLogin}>
                            로그인
                        </SideLink>
                    </SideBox>
                    <SideBox>
                        <SideLink to='/signup'>
                            회원가입
                        </SideLink>
                    </SideBox>
                </>
            }

        </Sidebars>
    )
};

export default Sidebar;