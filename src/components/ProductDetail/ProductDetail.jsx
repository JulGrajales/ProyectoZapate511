// src/components/ProductDetail/ProductDetail.jsx
import { useCart } from '../../context/CartContext';
import styles from './ProductDetail.module.css';

function ProductDetail({ product, onClose }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product); // Tu código original
    onClose(); // Tu código original

    // --- HISTORIAL DE COMPRAS ---
    const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];

    historial.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      fecha: new Date().toLocaleString()
    });

    localStorage.setItem("historialCompras", JSON.stringify(historial));
    // ------------------------------
  };

  // El .overlay ahora cierra el modal al hacer clic en el fondo
  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* e.stopPropagation() evita que el clic en el modal se propague al overlay */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Aquí ya se muestra la imagen del zapato */}
        <img src={product.image} alt={product.name} />

        <div className={styles.info}>
          <h2>{product.name}</h2>
          <p><strong>Color disponible:</strong> cafe</p>
          <p><strong>Precio (oferta):</strong> ${product.price.toFixed(2)} MXN</p>
          <p><strong>Tallas disponibles:</strong> 25.5, 26, 26.5, 27, 27.5, 28</p>
          <p><strong>Materiales / características:</strong></p>
          <ul>
            <li>Corte: piel genuina</li>
            <li>Forro: piel</li>
            <li>Suela: cuero con parte antiderrapante sintética</li>
            <li>Diseño: liso, sin adornos</li>
          </ul>
        </div>
        
        <button onClick={handleAdd} className={styles.button}>
          AGREGAR
        </button>
        <button 
          onClick={onClose} 
          className={`${styles.button} ${styles.closeButton}`}
        >
          Cerrar
        </button>

      </div>
    </div>
  );
}

export default ProductDetail;
