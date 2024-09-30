import React from 'react';
import { useMediaQuery } from 'react-responsive'


export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({
        query: "(min-width:1024px)"
    });

    return (
        <>
            {
                isDesktop && children
            }
        </>
    )
}


export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({
        query: "(max-width:1023px)"
    });

    return (
        <>
            {
                isMobile && children
            }
        </>
    )

}