// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import styles from '../components/AuthLayout/AuthLayout.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Ingresa tu correo y contraseña.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); 
    } catch (err) {
      // --- MANEJO DE ERRORES DE LOGIN ---
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No existe una cuenta con este correo.');
          break;
        case 'auth/wrong-password':
          setError('La contraseña es incorrecta.');
          break;
        case 'auth/invalid-credential':
          setError('Credenciales inválidas. Verifica tus datos.');
          break;
        default:
          setError('Error al iniciar sesión. Intenta de nuevo.');
          break;
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2 className={styles.title}>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="correo"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="contraseña"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.button}>
            Iniciar Sesión
          </button>
          {error && <p style={{ color: 'yellow', marginTop: '10px', fontSize: '14px' }}>{error}</p>}
        </form>
        <Link to="/registro" className={styles.link}>
          ¿No tienes cuenta? Regístrate gratis
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;