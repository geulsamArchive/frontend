import React, { useState, useEffect } from 'react';
import { Color60, NavMenu, NavMyPage, SmallNavContainer, SmallNavLink, SmallNavLinks, SmallNavMenuContainer, Yellow } from '../style/NavSmall';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { UserCheckForMobile } from '../apis/UserCheckForMobile';

const SmallNavMenu = ({ isOpen, closeMenu, isAdmin }) => {

    if (!isOpen) return null;

    return (
        <SmallNavMenuContainer>
            <SmallNavLink to="/" onClick={closeMenu}>
                <Color60>글샘문학회</Color60>
            </SmallNavLink>
            <SmallNavLink to="/work" onClick={closeMenu}>
                작품
            </SmallNavLink>
            <SmallNavLink to="/critic" onClick={closeMenu}>
                합평회
            </SmallNavLink>
            <SmallNavLink to="/archive/book" onClick={closeMenu}>
                포스터·문집
            </SmallNavLink>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
        </SmallNavMenuContainer>
    );
};

const LoginMenu = ({ isOpen, path, menuOn, isAdmin }) => {
    const { isAuthenticated, logout } = useAuth();
    const onClickLogout = () => {
        logout();
    };

    if (!isOpen)
        return (
            <>
                <div>{path}</div>
                <NavMyPage>
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={menuOn}
                    >
                        <circle cx="15" cy="10" r="5" fill="white" />
                        <path
                            d="M6.67232 21.6507C7.49868 18.1586 10.9646 16.25 14.5532 16.25H15.4467C19.0353 16.25 22.5013 18.1586 23.3276 21.6507C23.4875 22.3264 23.6146 23.0335 23.6861 23.7521C23.7544 24.439 23.1903 25 22.5 25H7.49997C6.80961 25 6.24549 24.439 6.31385 23.7521C6.38535 23.0335 6.51243 22.3264 6.67232 21.6507Z"
                            fill="white"
                        />
                    </svg>
                </NavMyPage>
            </>
        );

    return (
        <>
            {console.log("isAdmin 상태:", isAdmin)}
            {isAuthenticated ? (
                <SmallNavLinks>
                    <SmallNavLink to="/work/upload">작품올리기</SmallNavLink>
                    <SmallNavLink to={isAdmin ? '/admin/manage' : '/user/mypage'}>
                        {isAdmin ? '관리자페이지' : '마이페이지'}
                    </SmallNavLink>
                    <SmallNavLink onClick={onClickLogout}>로그아웃</SmallNavLink>
                </SmallNavLinks>
            ) : (
                <SmallNavLinks>
                    <SmallNavLink to="/signup">회원가입</SmallNavLink>
                    <SmallNavLink to="/login">로그인</SmallNavLink>
                </SmallNavLinks>
            )}
        </>
    );
};

const SmallNavbar = ({ path }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const isAdminRole = await UserCheckForMobile();
                console.log("isAdmin", isAdminRole[0]);
                //if (userRoles && userRoles.includes("ROLE_ADMIN"))
                if (isAdminRole[0] && isAdminRole.includes('ROLE_ADMIN')) {
                    setIsAdmin(true);
                }
                else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error(error.message);
                setIsAdmin(false);
            }
        };


        checkAdmin();
    }, []);
    useEffect(() => {
        if (isAdmin) {
            console.log("관리자임", isAdmin);
        }
    }, [isAdmin]); // isAdmin 상태가 업데이트되면 실행

    const onClickLoginMenu = () => {
        setIsLoginMenuOpen(true);
        setTimeout(() => setIsLoginMenuOpen(false), 5000);
    };

    const onClickMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const onCloseMenu = () => {
        setIsMenuOpen(false);
    };

    const pathTranslate = (path) => {
        if (path.pathname.startsWith('/work')) return '작품';
        else if (path.pathname.startsWith('/archive')) return '포스터·문집';
        else if (path.pathname.startsWith('/critic')) return '합평회';
        else return null;
    };

    return (
        <>
            <SmallNavContainer>
                <NavMenu onClick={onClickMenu}>
                    <svg
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.87511 9.625H26.1251"
                            stroke="white"
                            strokeWidth="2.02041"
                            strokeLinecap="round"
                        />
                        <path
                            d="M6.87511 16.5H26.1251"
                            stroke="white"
                            strokeWidth="2.02041"
                            strokeLinecap="round"
                        />
                        <path
                            d="M6.87511 23.375H26.1251"
                            stroke="white"
                            strokeWidth="2.02041"
                            strokeLinecap="round"
                        />
                    </svg>
                </NavMenu>
                <LoginMenu
                    isOpen={isLoginMenuOpen}
                    path={pathTranslate(path)}
                    menuOn={onClickLoginMenu}
                    loading={loading}
                    isAdmin={isAdmin}
                />
            </SmallNavContainer>
            <SmallNavMenu isOpen={isMenuOpen} closeMenu={onCloseMenu} />
        </>
    );
};

export default SmallNavbar;
