import { normalAPI } from './Api';
import React from 'react';
import { useAuth } from '../store/Auth';

export const userCheckForMobile = async (navigate, logout) => {
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');

  try {
    let response = await normalAPI.get('/user/check', {
      headers: {
        accessToken: accessToken,
      },
    });
    console.log(response);

    if (response.status === 200) {
      const userRoles = response.data.data.roles;
      if (userRoles.includes('ROLE_ADMIN')) {
        console.log('어드민 권한 확인 완료');
        return userRoles;
        // 어드민 페이지에 접근 허용
      } else {
        // 어드민 권한이 없을 경우, 메인 페이지로 리다이렉트
        navigate('/main');
        return false;
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.log('토큰 재전송');

      try {
        const tokenResponse = await normalAPI.get('/user/check', {
          headers: {
            refreshToken: refreshToken,
          },
        });

        if (tokenResponse.status === 200) {
          const newAccessToken = tokenResponse.headers.accesstoken.replace(
            'Bearer ',
            ''
          );
          localStorage.setItem('access', newAccessToken);
          if (tokenResponse.headers.refreshtoken) {
            const refreshToken = tokenResponse.headers.refreshtoken.replace(
              'Bearer ',
              ''
            );
            localStorage.setItem('refresh', refreshToken);
          }
          // 토큰 재발급 후 다시 유저 체크
          await userCheckForMobile(navigate, logout);
        }
      } catch (err) {
        console.error('Refresh Token Error:', err);
        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
        logout();
        navigate('/login'); // 로그인 페이지로 리다이렉트
      }
    } else {
      console.error('Error:', error);
    }
  }
  return false;
};
