import React from 'react';
import Calendar from './calendar/Calendar';
import RecentWork from './recentwork/RecentWork';

const Main = () => {
    return (
        <>
            <Calendar />
            <RecentWork />

        </>
    )


    // const Logined = 0 //로그인 성공시 true 반환

    // const admin = () => {
    //     if (user.user_level === 'master')
    //         return true
    //     else return false
    // };

    // if (Logined) {
    //     if (admin) {
    //         return (
    //             <>
    //                 <AdminPage />
    //             </>
    //         )

    //     } else {
    //         <> 아마도 navbar로 묶을듯
    //             <Author />
    //             <Seacrch />
    //             <Critic />
    //             <Awards />
    //         </>
    //     }
    // } else {
    //     return <Login />
    // }
};

export default Main;