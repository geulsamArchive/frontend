import React from 'react';
import { Link } from 'react-router-dom';

const AdminLinks = () => {
    return (
        <>
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                관리자 페이지
                <Link to='/admin/critic'>합평회 승인</Link>
                <Link to='/admin/calendar'>일정 추가</Link>
            </div>

        </>

    );
};

export default AdminLinks;