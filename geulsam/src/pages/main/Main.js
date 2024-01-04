import React from 'react';
import Login from '../../components/Login';

const Main = () => {

    //로그인 성공시 true 반환
    let Logined = 0
    const admin = () => {
        if (user.user_level === 'master')
            return true
        else return false
    };

    if (Logined) {
        if (admin) {
            return (
                <>
                    <AdminPage />
                </>
            )

        } else {
            <>
                <Author />
                <Seacrch />
                <Critic />
                <Awards />
            </>
        }
    } else {
        return <Login />
    }
};

export default Main;