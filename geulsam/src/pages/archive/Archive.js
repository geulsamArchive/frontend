import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ArchiveButtonContainer, PageContainer, ArchiveButton } from '../../style/StyledComponent';

const Archive = () => {
    const location = useLocation();

    return (
        <PageContainer>
            <ArchiveButtonContainer>
                <Link to="/archive/book">
                    <ArchiveButton disabled={location.pathname === '/archive/book'}>
                        문집
                    </ArchiveButton>
                </Link>
                <Link to="/archive/poster">
                    <ArchiveButton disabled={location.pathname === '/archive/poster'}>
                        포스터
                    </ArchiveButton>
                </Link>
            </ArchiveButtonContainer>
            <Outlet />
        </PageContainer>
    );
};

export default Archive;

