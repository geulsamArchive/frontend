import { Link } from "react-router-dom";
import styled from "styled-components";

export const AdminMenusContainer = styled.div`
    line-height: 2;
    margin-bottom: 50px;
    color: rgba(87, 86, 85, 1);
`

export const AdminMenuTitle = styled.div`
width: 85dvw;
    border-bottom: 2px solid rgba(87, 86, 85, 1);
    font-size: 22px;
    font-weight: 700;
`

export const AdminMenu = styled.div`
    border-bottom: 1.5px solid rgba(87, 86, 85, 1);
    width: 40dvw;
    font-size: 18px;
    line-height: 2.5;
    &:hover{
        background-color: rgba(255, 239, 155, 1);
    }
`

export const MenuLink = styled(Link)`
    text-decoration: none;
    color:rgba(87, 86, 85, 1);
`
export const AdminMenus = styled.div`
    display: flex;
    justify-content: space-between;
`