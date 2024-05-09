import React from 'react';
import { Link } from 'react-router-dom';
import Book from './book/Book';


//import PDFView from '../../components/pdf/PDFView';

//<PDFView data={info} />

const Archive = () => {
    return (
        <>
            <Link to="/archive">문집</Link>
            <Link to="/archive/poster">포스터</Link>
            <Book />
        </>
    );
};

export default Archive;

