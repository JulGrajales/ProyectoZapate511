// src/pages/CartPage.jsx
import { useCart } from '../context/CartContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css';

function CartPage() {
  // Nota: Asegúrate de añadir updateQuantity y removeFromCart en tu CartContext
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const calcularTotal = () => {
    // Ahora multiplica el precio por la cantidad de cada item
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleApartar = async () => {
    if (!user) {
      alert("Debes iniciar sesión para apartar productos.");
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "apartados"), {
        uid: user.uid,
        email: user.email,
        items: cart,
        total: calcularTotal(),
        fecha: new Date(),
        status: "pendiente"
      });

      clearCart();
      navigate(`/apartado/${docRef.id}`);

    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar tu reserva.");
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h1>Carrito de Reservas</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} />
              <div className={styles.info}>
                <h3>{item.name}</h3>
                <p>Talla: {item.tallaSelected}</p>
                
                {/* Selector de Cantidad */}
                <div className={styles.quantityControls}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <button 
                  className={styles.deleteBtn} 
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>
              <strong>${(item.price * item.quantity).toFixed(2)} MXN</strong>
            </div>
          ))}

          <div className={styles.cartFooter}>
            <h2>Total: ${calcularTotal().toFixed(2)} MXN</h2>
            <button className={styles.apartarBtn} onClick={handleApartar}>APARTAR</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;