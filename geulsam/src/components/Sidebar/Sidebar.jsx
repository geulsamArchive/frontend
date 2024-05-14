import React from 'react';
import { SideBox, SideLink, Sidebars } from '../../style/StyledComponent';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <Sidebars>
            <SideBox>
                <SideLink to="/login">
                    로그인
                </SideLink>
            </SideBox>
            <SideBox>
                <SideLink to='/signup'>
                    회원가입
                </SideLink>
            </SideBox>
        </Sidebars>
    )
};

export default Sidebar;