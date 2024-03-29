import React from 'react';
import { Sidebars } from '../../style/StyledComponent';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <Sidebars>
            사이드바<br />
            <Link to={'/login'}>로그인</Link>
            <br />
            <Link to={'/signup'}>회원가입</Link>
        </Sidebars>
    )
};

export default Sidebar;