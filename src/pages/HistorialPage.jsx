import { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function HistorialPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
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

      setTickets(data);
    };

    cargarHistorial();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Historial de Apartados</h1>

      {tickets.length === 0 ? (
        <p>No tienes apartados.</p>
      ) : (
        tickets.map(ticket => (
          <div key={ticket.id} style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 8
          }}>
            <p><strong>Total:</strong> ${ticket.total} MXN</p>
            <p><strong>Fecha:</strong> {new Date(ticket.fecha.seconds * 1000).toLocaleString()}</p>

            <Link to={`/apartado/${ticket.id}`}>
              Ver ticket
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default HistorialPage;
