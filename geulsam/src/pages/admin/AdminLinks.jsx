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
                관리자 페이지
                <br />
                <Link to='/admin/critic'>합평회 승인</Link>
                <br />
                <Link to='/admin/critic/log/upload'>합평회 기록 등록</Link>
                <br />
                <Link to='/admin/calendar'>일정 추가</Link>
                <br />
                <Link to='/admin/book/upload'>문집 업로드</Link>
                <br />
                <Link to='/admin/book/modify'>문집 수정</Link>
                <br />
                <Link to='/admin/poster/upload'>포스터 업로드</Link>
                <br />
                <Link to='/admin/poster/modify'>포스터 수정</Link>
                <br />
            </div>

        </>

    );
};

export default AdminLinks;