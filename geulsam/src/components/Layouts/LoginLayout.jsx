import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Back } from '../../style/StyledComponent';
import { SignupContainer } from '../../style/login.jsx';

const LoginLayout = () => {
  const path = useLocation();

  return (
    <>
      {path.pathname === '/login' ? (
        <>
          <SignupContainer>
            글샘문학회가 처음이라면?
            <Link to="/signup">신규 회원 글샘웹 가입 신청하기</Link>
          </SignupContainer>
          <Back>
            <Outlet />
          </Back>
        </>
      ) : (
        <>
          <SignupContainer>
            <Link to="/login">로그인 화면으로 돌아가기</Link>
          </SignupContainer>
          <Back>
            <Outlet />
          </Back>
        </>
      )}
    </>
  );
};

export default LoginLayout;
