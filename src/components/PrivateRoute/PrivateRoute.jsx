// src/components/PrivateRoute/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Necesitarás: npm install react-firebase-hooks
import { auth } from '../../config/firebase';

// NOTA: Instala 'react-firebase-hooks' para esto: npm install react-firebase-hooks
function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Cargando...</div>; // O un spinner
  }

  return user ? children : <Navigate to="/login" />;
}
export default PrivateRoute;