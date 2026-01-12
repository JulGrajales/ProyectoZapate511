import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth } from '../../config/firebase'; 
import { signOut } from 'firebase/auth';
import logo from '../../assets/logo-zapateria.png'; 

import styles from './Header.module.css';

function Header() { 
    const [user] = useAuthState(auth); 
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth);
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
                    <img 
                        src={logo} 
                        alt="Logo Zapatería" 
                        className={styles.logoImg} 
                    />
                    Bienvenido 
                </Link>
            </div>

            <nav className={styles.nav}> 
                {user ? (
                    <>
                        {/* Enlace al historial de apartados */}
                        <Link to="/historial" className={styles.navLink}>Historial</Link>

                        {/* Enlace al carrito de compras */}
                        <Link to="/carrito" className={styles.navLink}>Carrito</Link>

                        {/* 👉 NUEVO: Enlace a la ventana de gestión de cuenta (Perfil) */}
                        <Link to="/perfil" className={styles.navLink}>Mi Cuenta</Link>

                        <Link to="/quejas" className={styles.navLink}>Quejas</Link>
                        
                        <button onClick={handleLogout} className={styles.navButton}>Cerrar Sesión</button>
                    </>
                ) : (
                    <Link to="/login" className={styles.navLink}>Iniciar Sesión</Link>
                )}
            </nav>
        </header>
    );
}

export default Header;