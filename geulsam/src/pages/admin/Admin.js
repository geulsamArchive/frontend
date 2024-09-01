import React, { Children, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserCheck } from '../../apis/UserCheck';

const Admin = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            await UserCheck(navigate);
        };

        checkUser();
    }, [navigate]);
    return (
        <>
            <Outlet />
        </>
    );
};

export default Admin;