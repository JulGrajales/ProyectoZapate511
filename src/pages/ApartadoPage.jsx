import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import styles from './ApartadoPage.module.css';

function ApartadoPage() {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReserva = async () => {
      const docRef = doc(db, "apartados", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setReserva(docSnap.data());
      } else {
        console.log("No existe esa reserva!");
      }
      setLoading(false);
    };

    getReserva();
  }, [id]);

  if (loading) return <div>Cargando ticket...</div>;
  if (!reserva) return <div>Ticket no encontrado.</div>;

  const subtotal = reserva.total;
  const iva = subtotal * 0.16;
  const totalFinal = subtotal + iva;

  return (
    <div className={styles.ticketContainer}>
      <div className={styles.ticket}>

        <div className={styles.header}>
          gracias!!!
        </div>

        <h3>TICKET DE VENTA (Reserva)</h3>
        <p>Zapatería JGL</p>
        <p>Fecha: {new Date(reserva.fecha.seconds * 1000).toLocaleString()}</p>

        <hr />

        <p><strong>Cant. / Modelo / Precio</strong></p>

        {reserva.items.map(item => (
          <div key={item.id} className={styles.item}>
            1 - {item.name} - ${item.price.toFixed(2)}
          </div>
        ))}

        <hr />

        <div className={styles.total}>
          <p>Subtotal: ${subtotal.toFixed(2)} MXN</p>
          <p>IVA (16%): ${iva.toFixed(2)} MXN</p>
          <p>Total a pagar: ${totalFinal.toFixed(2)} MXN</p>
        </div>

        <hr />

        <p><strong>Forma de pago:</strong> Efectivo (En tienda)</p>
        <p><strong>Atendido por:</strong> Vendedor #02</p>

      </div>
    </div>
  );
}

export default ApartadoPage;
