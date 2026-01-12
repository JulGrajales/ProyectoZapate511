import { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function HistorialPage() {
  const [tickets, setTickets] = useState([]);
  const { loadTicketToCart } = useCart();
  const navigate = useNavigate();

  const cargarHistorial = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "apartados"),
      where("uid", "==", user.uid)
    );

    const res = await getDocs(q);
    const data = res.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Ordenar por fecha más reciente
    setTickets(data.sort((a, b) => b.fecha.seconds - a.fecha.seconds));
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  // --- FUNCIÓN PARA ELIMINAR TICKET ---
  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este ticket de tu historial?");
    if (confirmar) {
      try {
        await deleteDoc(doc(db, "apartados", id));
        setTickets(tickets.filter(ticket => ticket.id !== id));
        alert("Ticket eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el ticket.");
      }
    }
  };

  // --- FUNCIÓN PARA ACTUALIZAR (RE-EDITAR) PEDIDO ---
  const handleActualizar = async (ticket) => {
    const confirmar = window.confirm(
      "Esto cargará los productos de este ticket en tu carrito para que puedas editarlos. El ticket actual se eliminará para crear uno nuevo. ¿Continuar?"
    );
    
    if (confirmar) {
      try {
        // 1. Cargamos los items del ticket al carrito global
        loadTicketToCart(ticket.items);
        
        // 2. Borramos el ticket anterior de Firebase para evitar duplicados
        await deleteDoc(doc(db, "apartados", ticket.id));
        
        // 3. Redirigimos al carrito para que el usuario haga sus cambios
        navigate('/carrito');
      } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Hubo un problema al cargar el pedido.");
      }
    }
  };

  return (
    <div style={{ padding: 20, color: 'white' }}>
      <h1>Historial de Apartados</h1>

      {tickets.length === 0 ? (
        <p>No tienes apartados registrados.</p>
      ) : (
        tickets.map(ticket => (
          <div key={ticket.id} style={{
            border: "1px solid #555",
            padding: 15,
            marginBottom: 15,
            borderRadius: 8,
            backgroundColor: "#222"
          }}>
            <p><strong>ID Ticket:</strong> {ticket.id}</p>
            <p><strong>Total:</strong> ${ticket.total.toFixed(2)} MXN</p>
            <p><strong>Fecha:</strong> {new Date(ticket.fecha.seconds * 1000).toLocaleString()}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Link 
                to={`/apartado/${ticket.id}`} 
                style={{ color: "#4da6ff", textDecoration: "none", alignSelf: "center" }}
              >
                Ver ticket
              </Link>

              {/* Botón Actualizar */}
              <button 
                onClick={() => handleActualizar(ticket)}
                style={{ 
                  backgroundColor: "#4CAF50", 
                  color: "white", 
                  border: "none", 
                  padding: "8px 12px", 
                  borderRadius: "4px", 
                  cursor: "pointer" 
                }}
              >
                🔄 Actualizar Pedido
              </button>

              {/* Botón Eliminar */}
              <button 
                onClick={() => handleEliminar(ticket.id)}
                style={{ 
                  backgroundColor: "#f44336", 
                  color: "white", 
                  border: "none", 
                  padding: "8px 12px", 
                  borderRadius: "4px", 
                  cursor: "pointer" 
                }}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HistorialPage;