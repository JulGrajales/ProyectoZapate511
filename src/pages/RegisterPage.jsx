import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import styles from '../components/AuthLayout/AuthLayout.module.css';

function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // --- NUEVAS VALIDACIONES DE FRONTEND ---
    if (!nombre || !email || !password) {
      setError('Por favor, rellena todos los campos.');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Aquí podrías guardar el 'nombre' en Firestore si quisieras mas adelante
      navigate('/'); 
    } catch (err) {
      // --- MANEJO DE ERRORES DE FIREBASE ---
      console.error(err.code);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Este correo ya está registrado.');
          break;
        case 'auth/invalid-email':
          setError('El formato del correo no es válido.');
          break;
        case 'auth/weak-password':
          setError('La contraseña es muy débil.');
          break;
        default:
          setError('Error al crear la cuenta. Intenta de nuevo.');
          break;
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2 className={styles.title}>Crear Cuenta</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="nombre"
            className={styles.input}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
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
            Registrarse
          </button>
          {error && <p style={{ color: 'yellow', marginTop: '10px', fontSize: '14px' }}>{error}</p>}
        </form>
        <Link to="/login" className={styles.link}>
          ¿Ya tienes cuenta? Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;