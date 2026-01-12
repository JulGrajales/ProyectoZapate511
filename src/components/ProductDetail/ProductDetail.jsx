import { useState } from 'react';
// Cambiamos la importación para traer useCart directamente desde el context
import { useCart } from '../../context/CartContext'; 
import styles from './ProductDetail.module.css';

function ProductDetail({ product, onClose }) {
  const { addToCart } = useCart();
  
  // 1. Estado para la talla seleccionada
  const [tallaSelected, setTallaSelected] = useState("25.5");

  // 2. Lógica de precio dinámico
  // Si la talla es 27 o mayor, sumamos 50 pesos al precio base
  const obtenerPrecioFinal = () => {
    const tallaNum = parseFloat(tallaSelected);
    const cargoExtra = tallaNum >= 27 ? 50 : 0; 
    return product.price + cargoExtra;
  };

  const precioFinal = obtenerPrecioFinal();

  const handleAdd = () => {
    // 3. Enviamos el producto con el precio actualizado y la talla al carrito
    // Usamos un ID combinado (id-talla) para que el carrito pueda distinguir 
    // entre el mismo modelo pero de diferentes tallas.
    const productoParaCarrito = {
      ...product,
      id: `${product.id}-${tallaSelected}`, 
      price: precioFinal,
      tallaSelected: tallaSelected,
      quantity: 1
    };

    addToCart(productoParaCarrito);
    onClose();

    // --- MANTENIENDO TU HISTORIAL DE LOCALSTORAGE ---
    const historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
    historial.push({
      ...productoParaCarrito,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem("historialCompras", JSON.stringify(historial));
  };

  const tallasDisponibles = ["25.5", "26", "26.5", "27", "27.5", "28"];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <img src={product.image} alt={product.name} />

        <div className={styles.info}>
          <h2>{product.name}</h2>
          <p><strong>Color disponible:</strong> cafe</p>
          
          {/* Muestra el precio dinámico basado en la talla */}
          <p><strong>Precio:</strong> 
            <span style={{ 
              color: parseFloat(tallaSelected) >= 27 ? '#ffcc00' : 'white', 
              fontWeight: 'bold',
              marginLeft: '5px' 
            }}>
              ${precioFinal.toFixed(2)} MXN
            </span>
            {parseFloat(tallaSelected) >= 27 && (
              <span style={{ fontSize: '0.8rem', display: 'block', color: '#aaa' }}>
                (Incluye cargo por talla grande)
              </span>
            )}
          </p>

          <div style={{ margin: '15px 0' }}>
            <label><strong>Selecciona tu talla:</strong></label>
            <select 
              value={tallaSelected} 
              onChange={(e) => setTallaSelected(e.target.value)}
              className={styles.selectTalla}
              style={{ 
                marginLeft: '10px', 
                padding: '8px', 
                borderRadius: '4px',
                backgroundColor: '#333',
                color: 'white',
                border: '1px solid #555'
              }}
            >
              {tallasDisponibles.map(talla => (
                <option key={talla} value={talla}>
                  Talla {talla} {parseFloat(talla) >= 27 ? '(+$50)' : ''}
                </option>
              ))}
            </select>
          </div>

          <p><strong>Materiales / características:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Corte: piel genuina</li>
            <li>Forro: piel</li>
            <li>Suela: cuero con parte antiderrapante sintética</li>
            <li>Diseño: liso, sin adornos</li>
          </ul>
        </div>
        
        <div className={styles.buttonContainer} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={handleAdd} className={styles.button}>
            AGREGAR AL CARRITO
          </button>
          <button 
            onClick={onClose} 
            className={`${styles.button} ${styles.closeButton}`}
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;