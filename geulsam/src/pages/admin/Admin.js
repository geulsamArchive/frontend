import React, { Children, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserCheck } from '../../apis/UserCheck';
import { useAuth } from '../../store/Auth';

const Admin = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const checkUser = async () => {
            await UserCheck(navigate, logout);
        };

        checkUser();
    }, [navigate, logout]);
    return (
        <>
            <Outlet />
        </>
    );
};

export default Admin;