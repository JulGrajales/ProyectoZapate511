// src/components/MainLayout/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

function MainLayout() {
    return (
        <div className='main-container'> 
            <Header /> 
            <Outlet />
        </div>
    );
}

export default MainLayout;