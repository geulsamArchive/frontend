import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../footer/Footer';
import styled from 'styled-components';

const Background = styled.div`
  @media only screen and (max-width: 1023px) {
    background-color: rgba(29, 28, 28, 1);
  }
  background-color: rgba(249, 249, 246, 1);
`;

const NavLayout = () => {
  return (
    <>
      <Navbar />
      <Background>
        <Outlet />
      </Background>
      <Sidebar />
      <Footer />
    </>
  );
};

export default NavLayout;
