import { normalAPI } from "./Api";
import React from "react";
import { useAuth } from "../store/Auth";

export const UserCheck = async (navigate, logout) => {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    try {
        let response = await normalAPI.get(
            '/user/check',
            {
                headers: {
                    'accessToken': accessToken
                }
            }
        );
        console.log(response)

        if (response.status === 200) {
            const userRoles = response.data.data.roles;
            if (userRoles.includes('ROLE_ADMIN')) {
                console.log('어드민 권한 확인 완료');
                // 어드민 페이지에 접근 허용
            } else {
                alert('어드민 권한이 없습니다.');
                // 어드민 권한이 없을 경우, 메인 페이지로 리다이렉트
                navigate('/main');
            }
        }

    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.log('토큰 재전송');

            try {
                const tokenResponse = await normalAPI.get(
                    '/user/check',
                    {},
                    {
                        headers: {
                            'refreshToken': refreshToken,
                        }
                    }
                );

                if (tokenResponse.status === 200) {
                    const newAccessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '');
                    localStorage.setItem('access', newAccessToken);
                    const newRefreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '');
                    localStorage.setItem('refresh', newRefreshToken);

                    // 토큰 재발급 후 다시 유저 체크
                    await UserCheck(navigate, logout);

                }
            } catch (err) {
                console.error('Refresh Token Error:', err);
                alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
                logout();
                navigate('/main'); // 로그인 페이지로 리다이렉트
            }
        } else {
            console.error('Error:', error);
        }
    }
}
