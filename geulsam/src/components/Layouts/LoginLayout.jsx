import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Back } from '../../style/StyledComponent';
import {
  Gray,
  SignupContainer,
  SignupContainer2,
  Yellow,
} from '../../style/login.jsx';
import { Desktop } from '../../hooks/useMediaQuery.jsx';

const LoginLayout = () => {
  const path = useLocation();

  return (
    <>
      {path.pathname === '/login' ? (
        <>
          <SignupContainer>
            <Desktop>글샘문학회가 처음이라면?&nbsp;&nbsp;</Desktop>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Yellow>신규 회원 글샘웹 가입 신청하기</Yellow>
            </Link>
          </SignupContainer>
          <Back>
            <Outlet />
          </Back>
        </>
      ) : (
        <>
          <SignupContainer2>
            <Desktop>글샘웹 기존 회원이라면? &nbsp;&nbsp;</Desktop>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Gray>로그인 화면으로 돌아가기</Gray>
            </Link>
          </SignupContainer2>
          <Back>
            <Outlet />
          </Back>
        </>
      )}
    </>
  );
};

export default LoginLayout;
