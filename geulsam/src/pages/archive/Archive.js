import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button, ArchiveButtonContainer, PageContainer } from '../../style/StyledComponent';

const Archive = () => {
    const location = useLocation();
    return (
        <PageContainer>
            <ArchiveButtonContainer>
                <Link to="/archive/book">
                    <Button disabled={location.pathname === '/archive/book'}>
                        문집
                    </Button>
                </Link>
                <Link to="/archive/poster">
                    <Button disabled={location.pathname === '/archive/poster'}>
                        포스터
                    </Button>
                </Link>
            </ArchiveButtonContainer>
            <Outlet />

        </PageContainer>
    );
};

export default Archive;

