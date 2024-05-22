import React from 'react';
import { Outlet } from 'react-router-dom';
import { Back } from '../../style/StyledComponent';

const LoginLayout = () => {
    return (
        <>
            <Back>
                <Outlet />
            </Back>
        </>
    );
};

export default LoginLayout;