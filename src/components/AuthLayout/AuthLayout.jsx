// src/components/AuthLayout/AuthLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header'; 

function AuthLayout() {
    return (
        <div className="auth-layout-container">
            {/* INCLUIMOS EL HEADER CON LOGO Y NAVEGACIÓN */}
            <Header /> 
            
            <Outlet />
        </div>
    );
}

export default AuthLayout;