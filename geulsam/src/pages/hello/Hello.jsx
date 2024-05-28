import React from 'react';
import { Link } from 'react-router-dom';
import Signup1 from '../signup/Signup1';

const Hello = () => {
    return (<>
        <Link to='/main'>
            입장하실게요 ㅎㅎ
        </Link>
        <Signup1 />
    </>
    );
};

export default Hello;