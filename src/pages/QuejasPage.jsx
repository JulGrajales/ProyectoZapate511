import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  orderBy 
} from 'firebase/firestore';
import styles from '../components/AuthLayout/AuthLayout.module.css';

function QuejasPage() {
  const [quejas, setQuejas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

  // --- FUNCIÓN PARA CARGAR DATOS (READ) ---
  const cargarQuejas = async () => {
  // Verificamos explícitamente auth.currentUser si 'user' aún no llega por estado
  const usuarioActivo = auth.currentUser; 
  
  if (!usuarioActivo) {
    console.log("Esperando autenticación...");
    return;
  }

  try {
    const q = query(
      collection(db, "quejas"), 
      where("uid", "==", usuarioActivo.uid),
      orderBy("fecha", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    console.log("Quejas recuperadas:", docs.length); // Para ver en consola si llegan datos
    setQuejas(docs);
  } catch (error) {
    console.error("Error al recuperar quejas:", error);
  }
};

  useEffect(() => {
    cargarQuejas();
  }, [user]); // Se ejecuta cuando el usuario carga

  // --- FUNCIÓN PARA GUARDAR/EDITAR (CREATE/UPDATE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    setLoading(true);

    try {
      if (editandoId) {
        // ACTUALIZAR
        await updateDoc(doc(db, "quejas", editandoId), {
          texto: mensaje,
          fechaEdicion: new Date()
        });
        setEditandoId(null);
      } else {
        // CREAR
        await addDoc(collection(db, "quejas"), {
          uid: user.uid,
          email: user.email,
          texto: mensaje,
          fecha: new Date()
        });
      }
      setMensaje('');
      cargarQuejas();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
    setLoading(false);
  };

  const eliminarQueja = async (id) => {
    if (window.confirm("¿Deseas eliminar esta queja?")) {
      try {
        await deleteDoc(doc(db, "quejas", id));
        cargarQuejas();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const prepararEdicion = (queja) => {
    setMensaje(queja.texto);
    setEditandoId(queja.id);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox} style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className={styles.title}>Buzón de Quejas</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            className={styles.input}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu queja o sugerencia aquí..."
            style={{ minHeight: '120px', resize: 'vertical', paddingTop: '10px' }}
          />
          
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Procesando...' : (editandoId ? 'ACTUALIZAR MI QUEJA' : 'ENVIAR COMENTARIO')}
          </button>

          {editandoId && (
            <button 
              type="button"
              className={styles.button} 
              style={{ backgroundColor: '#666', marginTop: '5px' }}
              onClick={() => { setEditandoId(null); setMensaje(''); }}
            >
              Cancelar Edición
            </button>
          )}
        </form>

        <div style={{ marginTop: '30px', borderTop: '1px solid #444', paddingTop: '20px' }}>
          <h3 style={{ color: 'white', marginBottom: '15px' }}>Tus registros anteriores:</h3>
          
          {quejas.length === 0 ? (
            <p style={{ color: '#aaa', textAlign: 'center' }}>No hay quejas registradas.</p>
          ) : (
            quejas.map(q => (
              <div key={q.id} style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '15px', 
                borderRadius: '8px', 
                marginBottom: '10px',
                border: '1px solid #333'
              }}>
                <p style={{ color: 'white', margin: '0 0 10px 0' }}>{q.texto}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small style={{ color: '#888' }}>
                    {q.fecha?.toDate ? q.fecha.toDate().toLocaleDateString() : 'Reciente'}
                  </small>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => prepararEdicion(q)}
                      style={{ background: 'none', border: 'none', color: '#4da6ff', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => eliminarQueja(q.id)}
                      style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default QuejasPage;