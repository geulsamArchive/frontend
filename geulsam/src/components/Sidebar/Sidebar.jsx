import React from 'react';
import { SideBox, SideLink, SideLink2, Sidebars } from '../../style/StyledComponent';
import { useAuth } from '../../store/Auth';
const Sidebar = () => {
    const { isAuthenticated, logout } = useAuth();

    const onClickLogout = () => {
        logout();
    };

    return (
        <Sidebars>
            {isAuthenticated
                ?
                <>
                    <SideBox>
                        <SideLink2 to='/work/upload'>
                            작품올리기
                        </SideLink2>
                    </SideBox>
                    <SideBox>
                        <SideLink to='/user/mypage'>
                            마이페이지
                        </SideLink>
                    </SideBox>
                    <SideBox>
                        <SideLink onClick={onClickLogout}>
                            로그아웃
                        </SideLink>
                    </SideBox>
                </>
                :
                <>
                    <SideBox>
                        <SideLink to='/signup'>
                            회원가입
                        </SideLink>
                    </SideBox>
                    <SideBox>
                        <SideLink to="/login">
                            로그인
                        </SideLink>
                    </SideBox></>
            }
        </Sidebars>
    )
};

export default Sidebar;
