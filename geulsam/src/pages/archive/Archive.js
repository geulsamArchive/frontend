import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button, ArchiveButtonContainer } from '../../style/StyledComponent';

const Archive = () => {
    return (
        <>
            <ArchiveButtonContainer>
                <Link to="/archive/book">
                    <Button>
                        문집
                    </Button>
                </Link>
                <Link to="/archive/poster">
                    <Button>
                        포스터
                    </Button>
                </Link>
            </ArchiveButtonContainer>
            <Outlet />

        </>
    );
};

export default Archive;

