import { useState } from 'react';
import { auth } from '../config/firebase';
import { updateEmail, updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from '../components/AuthLayout/AuthLayout.module.css';

function ProfilePage() {
  const user = auth.currentUser;
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // Necesaria para re-autenticar
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para re-autenticar (Firebase pide esto para cambios sensibles)
  const reauthenticate = async (password) => {
    const credential = EmailAuthProvider.credential(user.email, password);
    return reauthenticateWithCredential(user, credential);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!currentPassword) {
      setError('Debes ingresar tu contraseña actual para realizar cambios.');
      return;
    }

    try {
      await reauthenticate(currentPassword);
      
      if (newEmail !== user.email) {
        await updateEmail(user, newEmail);
      }
      
      if (newPassword) {
        if (newPassword.length < 8) {
          setError('La nueva contraseña debe tener al menos 8 caracteres.');
          return;
        }
        await updatePassword(user, newPassword);
      }
      
      setMessage('Datos actualizados con éxito.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError('Error al actualizar: Verifica tu contraseña actual.');
    }
  };

  const handleDelete = async () => {
    const confirmación = window.confirm("¿Estás seguro? Se borrarán todos tus datos de Zapate511.");
    if (!confirmación) return;

    const pass = prompt("Por seguridad, ingresa tu contraseña para eliminar la cuenta:");
    if (!pass) return;

    try {
      await reauthenticate(pass);
      await deleteUser(user);
      navigate('/registro');
    } catch (err) {
      alert("Error: No se pudo eliminar la cuenta. Verifica la contraseña.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2 className={styles.title}>Mi Cuenta</h2>
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: 'white' }}>Correo Electrónico:</label>
            <input 
              type="email" 
              className={styles.input} 
              value={newEmail} 
              onChange={(e) => setNewEmail(e.target.value)} 
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: 'white' }}>Nueva Contraseña (opcional):</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="Mínimo 8 caracteres"
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
            />
          </div>

          <div style={{ marginBottom: '15px', borderTop: '1px solid #555', paddingTop: '10px' }}>
            <label style={{ color: 'yellow' }}>Contraseña Actual (requerida):</label>
            <input 
              type="password" 
              className={styles.input} 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              required
            />
          </div>

          <button type="submit" className={styles.button}>Actualizar Perfil</button>
        </form>

        <button 
          onClick={handleDelete} 
          className={styles.button} 
          style={{ backgroundColor: '#ff4444', marginTop: '20px' }}
        >
          Eliminar mi cuenta definitivamente
        </button>

        {message && <p style={{ color: '#00ff00', marginTop: '10px' }}>{message}</p>}
        {error && <p style={{ color: 'yellow', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
}

export default ProfilePage;