import React from 'react';
import { Link } from 'react-router-dom';

const LinkAll = () => {
    return (
        <div>
            <Link to={'/author'}>작가</Link>
            <Link to={'/award'}>글샘문학상</Link>
            <Link to={'/criticism'}>합평회</Link>
            <Link to={'/admin/signup'}>회원가입</Link>
        </div>
    );
};

export default LinkAll;