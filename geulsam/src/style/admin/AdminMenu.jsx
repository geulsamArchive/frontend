import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AdminMenusContainer = styled.div`
  line-height: 2;
  margin-bottom: 50px;
  color: rgba(87, 86, 85, 1);
`;

export const AdminMenuTitle = styled.div`
  width: 81dvw;
  border-bottom: 1.5px solid rgba(87, 86, 85, 1);
  font-size: 22px;
  font-weight: 700;
  @media only screen and (max-width: 1024px) {
    margin-left: 1dvw;
  }
`;

export const AdminMenu = styled.div`
  border-bottom: 1.5px solid rgba(87, 86, 85, 1);
  width: 37dvw;
  font-size: 18px;
  line-height: 2.5;
  &:hover {
    background-color: rgba(255, 239, 155, 1);
  }
`;

export const MenuLink = styled(Link)`
  text-decoration: none;
  color: rgba(87, 86, 85, 1);
`;
export const AdminMenus = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    margin-left: 1dvw;
  }
`;

export const AdminWallpaper = styled.div`
  background-color: #f9f9f6;
  height: calc(100dvh - 100px);
`;
