// src/context/CartContext.jsx
import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 1. Agregar al carrito (con lógica de no duplicar)
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Buscamos si el producto con ese ID y esa TALLA ya existe
      const itemExists = prevCart.find(
        (item) => item.id === product.id && item.tallaSelected === product.tallaSelected
      );

      if (itemExists) {
        // Si existe, aumentamos su cantidad
        return prevCart.map((item) =>
          item.id === product.id && item.tallaSelected === product.tallaSelected
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      // Si no existe, lo añadimos con cantidad inicial
      return [...prevCart, { ...product, quantity: product.quantity || 1 }];
    });
  };

  // 2. Actualizar cantidad (Botones + y - en el carrito)
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Evita que la cantidad sea menor a 1
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 3. Eliminar un solo producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 4. Cargar pedido anterior para "Actualizar Ticket"
  // Esta función recibe los items de un ticket viejo y los pone en el carrito
  const loadTicketToCart = (ticketItems) => {
    setCart(ticketItems);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        clearCart, 
        updateQuantity, 
        removeFromCart,
        loadTicketToCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};