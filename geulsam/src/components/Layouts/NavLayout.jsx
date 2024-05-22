import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../footer/Footer';

const NavLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Sidebar />
            <Footer />
        </>
    );
};

export default NavLayout;