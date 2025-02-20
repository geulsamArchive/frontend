import React, { useState, useEffect } from 'react';
import {
  Color60,
  NavMenu,
  NavMyPage,
  SmallNavContainer,
  SmallNavLink,
  SmallNavLinks,
  SmallNavMenuContainer,
  Yellow,
} from '../style/NavSmall';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import { userCheckForMobile } from '../apis/UserCheckForMobile';

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
      {console.log('isAdmin 상태:', isAdmin)}
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
        const isAdminRole = await userCheckForMobile();
        console.log('isAdmin', isAdminRole[0]);
        //if (userRoles && userRoles.includes("ROLE_ADMIN"))
        if (isAdminRole[0] && isAdminRole.includes('ROLE_ADMIN')) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error(error.message);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

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
          {isMenuOpen ? (
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 20.1752C9.22946 20.1752 7.97136 19.9249 6.79753 19.4387C5.62371 18.9525 4.55715 18.2399 3.65874 17.3415C2.76033 16.443 2.04768 15.3765 1.56146 14.2027C1.07525 13.0288 0.824997 11.7707 0.824997 10.5002C0.824997 9.22966 1.07525 7.97156 1.56146 6.79773C2.04768 5.62391 2.76033 4.55734 3.65874 3.65894C4.55715 2.76053 5.62371 2.04787 6.79754 1.56166C7.97136 1.07545 9.22946 0.825195 10.5 0.825195C11.7705 0.825196 13.0286 1.07545 14.2025 1.56166C15.3763 2.04788 16.4429 2.76053 17.3413 3.65894C18.2397 4.55735 18.9523 5.62391 19.4385 6.79774C19.9247 7.97156 20.175 9.22966 20.175 10.5002C20.175 11.7707 19.9247 13.0288 19.4385 14.2027C18.9523 15.3765 18.2397 16.443 17.3413 17.3415C16.4428 18.2399 15.3763 18.9525 14.2025 19.4387C13.0286 19.9249 11.7705 20.1752 10.5 20.1752L10.5 20.1752Z"
                stroke="white"
                stroke-width="1.32"
                stroke-linecap="round"
              />
              <path
                d="M7.27499 7.2749L13.725 13.7249"
                stroke="white"
                stroke-width="1.32"
                stroke-linecap="round"
              />
              <path
                d="M13.725 7.2749L7.27501 13.7249"
                stroke="white"
                stroke-width="1.32"
                stroke-linecap="round"
              />
            </svg>
          ) : (
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
          )}
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
