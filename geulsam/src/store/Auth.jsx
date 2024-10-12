import React, { createContext, useState, useContext } from 'react';
import { normalAPI } from '../apis/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));

    const refresh = localStorage.getItem('refresh')

    const logout = async () => {
        try {
            const res = await normalAPI.post(`/user/logout?refreshToken=${refresh}`)
        } catch (err) {

        }
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false);
        console.log('로그아웃완료')
    };

    const login = (accessToken, refreshToken) => {
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refresh', refreshToken);
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
