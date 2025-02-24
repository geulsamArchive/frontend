import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Color60 = styled.span`
  color: rgba(129, 128, 127, 1);
`;

export const SmallNavContainer = styled.div`
  background-color: rgba(29, 28, 28, 1);
  width: 100dvw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
  color: rgba(129, 128, 127, 1);
  font-weight: 700;
  font-family: 'MaruBuri-Regular';
  font-size: 16px;
  position: fixed;
  top: 0;
  z-index: 3;
`;

export const NavMenu = styled.div`
  margin-left: 10px;
`;

export const NavMyPage = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

export const SmallNavMenuContainer = styled.div`
  width: 95dvw;
  height: calc(100dvh - 70px);
  background-color: rgba(29, 28, 28, 1);
  border-radius: 16px;
  font-family: 'MaruBuri-Regular';
  position: fixed;
  top: calc((100dvh - 80px) / 2 + 52px);
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  flex-direction: column;
  font-size: 21px;
  line-height: 1.7;
  gap: 30px;
`;

export const SmallNavLink = styled(Link)`
  color: rgba(249, 249, 246, 1);
  text-decoration: none;
  &:hover {
    color: rgba(255, 239, 155, 1);
  }
`;

export const SmallNavLinks = styled.div`
  font-size: 14px;
  display: flex;
  gap: 20px;
  margin-right: 10px;
`;
