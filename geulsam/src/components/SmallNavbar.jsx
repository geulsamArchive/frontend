import React from 'react';
import { NavMenu, NavMyPage, SmallNavContainer } from '../style/NavSmall';

const SmallNavbar = () => {
    return (
        <>
            <SmallNavContainer>
                <NavMenu>
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.87511 9.625H26.1251" stroke="white" stroke-width="2.02041" stroke-linecap="round" />
                        <path d="M6.87511 16.5H26.1251" stroke="white" stroke-width="2.02041" stroke-linecap="round" />
                        <path d="M6.87511 23.375H26.1251" stroke="white" stroke-width="2.02041" stroke-linecap="round" />
                    </svg>
                </NavMenu>
                <div>
                    가운데
                </div>
                <NavMyPage>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="10" r="5" fill="white" />
                        <path d="M6.67232 21.6507C7.49868 18.1586 10.9646 16.25 14.5532 16.25H15.4467C19.0353 16.25 22.5013 18.1586 23.3276 21.6507C23.4875 22.3264 23.6146 23.0335 23.6861 23.7521C23.7544 24.439 23.1903 25 22.5 25H7.49997C6.80961 25 6.24549 24.439 6.31385 23.7521C6.38535 23.0335 6.51243 22.3264 6.67232 21.6507Z" fill="white" />
                    </svg>
                </NavMyPage>
            </SmallNavContainer>
        </>

    );
};

export default SmallNavbar;