const mockProducts = [
  { id: 1, name: "Oxford liso — Jean Pierre", color: "negro", price: 2000.00, image: "./src/assets/oxfort.jgp.webp", materiales: ["Piel genuina", "Suela de cuero", "Plantilla acolchonada"] },
  { id: 2, name: "Blucher tipo Oxford — Jean Pierre", color: "café", price: 2519.00, image: "./src/assets/Jean Pierre.webp", materiales: ["Piel curtida", "Costuras reforzadas", "Suela sintética"] },
  { id: 3, name: "Zapato de charol — Jean Pierre", color: "negro brillante", price: 3000.00, image: "./src/assets/Zapato de charol.webp", materiales: ["Charol premium", "Forro de piel", "Suela antiderrapante"] },
  { id: 4, name: "Zapato formal negro — Boston", color: "negro", price: 2700.00, image: "/src/assets/Boston.webp", materiales: ["Piel lisa", "Suela de cuero", "Interior textil suave"] },
  { id: 5, name: "Mocasín clásico — Flexi", color: "negro", price: 1999.00, image: "/src/assets/Flexi.webp", materiales: ["Piel suave", "Costuras a mano", "Suela ligera"] },
  { id: 6, name: "Derby clásico — Lottusse", color: "negro", price: 3200.00, image: "/src/assets/Lottusse.webp", materiales: ["Piel europea", "Forro respirable", "Suela de goma premium"] },
  { id: 7, name: "Monk strap — Ferrato", color: "negro", price: 3100.00, image: "/src/assets/Ferrato.webp", materiales: ["Piel negra tratada", "Hebillas metálicas", "Suela de cuero"] },
  { id: 8, name: "Mocasín café — Clarks", color: "café", price: 2600.00, image: "/src/assets/Clarks.webp", materiales: ["Gamuza café", "Plantilla memory foam", "Suela sintética"] },
  { id: 9, name: "Oxford brogue — Aldo", color: "café claro", price: 3300.00, image: "/src/assets/Oxford brogue.webp", materiales: ["Piel perforada", "Suela rígida", "Forro textil"] },
  { id: 10, name: "Zapato formal azul — Ferrato", color: "azul marino", price: 2900.00, image: "/src/assets/Zapato formal azul.webp", materiales: ["Piel teñida azul", "Forro sintético", "Suela antiderrapante"] },
  { id: 11, name: "Monk doble hebilla — Hush Puppies", color: "negro", price: 3150.00, image: "/src/assets/Monk doble hebilla.webp", materiales: ["Piel flexible", "Doble hebilla metálica", "Suela ergonómica"] },
  { id: 12, name: "Mocasín con borla — Flexi", color: "café", price: 2700.00, image: "/src/assets/Mocasín con borla.webp", materiales: ["Piel café", "Borlas decorativas", "Suela ligera"] },
  { id: 13, name: "Derby punta redonda — Lottusse", color: "negro", price: 3000.00, image: "/src/assets/Derby punta redonda.webp", materiales: ["Piel lisa negra", "Suela sólida", "Plantilla de confort"] },
  { id: 14, name: "Oxford con costura — Bally", color: "negro", price: 3150.00, image: "/src/assets/Oxford con costura.webp", materiales: ["Piel premium", "Costura visible", "Suela rígida italiana"] },
  { id: 15, name: "Zapato italiano premium — Giorgio Brutini", color: "negro", price: 3700.00, image: "/src/assets/Giorgio Brutini.webp", materiales: ["Piel italiana", "Acabado brillante", "Suela artesanal"] },
  { id: 16, name: "Zapato casual beige — Zara", color: "beige", price: 1800.00, image: "/src/assets/Zapato casual.webp", materiales: ["Tela beige", "Suela de goma", "Interior suave"] },
  { id: 17, name: "Botín chelsea — Dr. Martens", color: "negro", price: 4200.00, image: "/src/assets/Botín chelsea.webp", materiales: ["Piel resistente", "Elástico lateral", "Suela de aire (AirWair)"] },
  { id: 18, name: "Mocasín ligero — Dockers", color: "café", price: 2100.00, image: "/src/assets/Mocasín ligero.webp", materiales: ["Piel ligera", "Costuras reforzadas", "Suela flexible"] },
  { id: 19, name: "Zapato formal vino — Milano", color: "vino", price: 2800.00, image: "/src/assets/Zapato formal.webp", materiales: ["Piel color vino", "Suela elegante", "Interior acolchado"] },
  { id: 20, name: "Zapato sport elegante — Flexi", color: "café", price: 2300.00, image: "/src/assets/Zapato sport.webp", materiales: ["Piel café", "Suela deportiva", "Forro transpirable"] },
  { id: 21, name: "Zapato casual gris — H&M", color: "gris", price: 1700.00, image: "/src/assets/Zapato casual gris.webp", materiales: ["Tela gris", "Suela EVA", "Plantilla suave"] },
  { id: 22, name: "Derby piel marrón — Lottusse", color: "marrón", price: 3300.00, image: "/src/assets/Derby piel marrón.webp", materiales: ["Piel marrón", "Suela italiana", "Forro premium"] },
  { id: 23, name: "Zapato de gamuza — Zara", color: "café claro", price: 2500.00, image: "/src/assets/Zapato de gamuza.webp", materiales: ["Gamuza suave", "Suela sintética", "Forro textil"] },
  { id: 24, name: "Oxford clásico negro — Hugo Boss", color: "negro", price: 4100.00, image: "/src/assets/Oxford clásico negro.webp", materiales: ["Piel fina", "Terminado premium", "Suela rígida"] },
  { id: 25, name: "Mocasín italiano — Prada", color: "negro", price: 4500.00, image: "/src/assets/Mocasín italiano.webp", materiales: ["Piel italiana", "Costura artesanal", "Suela de lujo"] },
  { id: 26, name: "Zapato casual azul — Ferrato", color: "azul", price: 2400.00, image: "/src/assets/Zapato casual azul.webp", materiales: ["Tela azul", "Suela ligera", "Interior acolchonado"] },
  { id: 27, name: "Zapato bostoniano — Aldo", color: "café", price: 3200.00, image: "/src/assets/Zapato bostoniano.webp", materiales: ["Piel café", "Costuras decorativas", "Suela elegante"] },
  { id: 28, name: "Derby inglés — Lottusse", color: "negro", price: 3400.00, image: "/src/assets/Derby inglés.webp", materiales: ["Piel negra gruesa", "Forro premium", "Suela grabada"] },
  { id: 29, name: "Zapato formal beige — Milano", color: "beige", price: 2900.00, image: "/src/assets/Zapato formal beige.webp", materiales: ["Piel beige", "Interior suave", "Suela antiderrapante"] },
  { id: 30, name: "Monk elegante — Ferrato", color: "café oscuro", price: 3300.00, image: "/src/assets/Monk elegante.webp", materiales: ["Piel café oscuro", "Hebilla metálica", "Suela rígida"] },
  { id: 31, name: "Zapato vintage — Clarks", color: "café", price: 2600.00, image: "/src/assets/zapato cafe.webp", materiales: ["Piel café envejecida", "Suela clásica", "Interior suave"] },
  { id: 32, name: "Oxford moderno — Jean Pierre", color: "negro", price: 3100.00, image: "/src/assets/Oxford moderno.webp", materiales: ["Piel moderna", "Diseño minimalista", "Suela de goma"] },
  { id: 33, name: "Mocasín urbano — Dockers", color: "café", price: 2200.00, image: "/src/assets/Mocasín urbano.webp", materiales: ["Piel urbana", "Costuras gruesas", "Suela flexible"] },
  { id: 34, name: "Zapato elegante premium — Bally", color: "negro", price: 3800.00, image: "/src/assets/Zapato elegante premium.webp", materiales: ["Piel fina negra", "Terminado premium", "Suela italiana"] }
];


// src/pages/Home.jsx
import { useState } from 'react';
import styles from './Home.module.css';
import ProductDetail from '../components/ProductDetail/ProductDetail'; // Lo crearemos

// ... (pega const mockProducts aquí) ...

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      <div className={styles.productList}>
        {mockProducts.map(product => (
          <div 
            key={product.id} 
            className={styles.card}
            onClick={() => setSelectedProduct(product)} // Abre el modal
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)} MXN</p>
          </div>
        ))}
      </div>

      {/* Modal de Detalle */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
export default Home;
