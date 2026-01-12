import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Layout
import MainLayout from "./components/MainLayout/MainLayout";

// Páginas
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ApartadoPage from "./pages/ApartadoPage";
import HistorialPage from "./pages/HistorialPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage"; // <--- Importar nueva página
import QuejasPage from "./pages/QuejasPage";

// Protección
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* ===== RUTAS CON BARRA ===== */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            
            <Route path="/carrito" element={
              <PrivateRoute><CartPage /></PrivateRoute>
            } />

            <Route path="/historial" element={
              <PrivateRoute><HistorialPage /></PrivateRoute>
            } />

            <Route path="/perfil" element={ // <--- Ruta para Mi Cuenta
              <PrivateRoute><ProfilePage /></PrivateRoute>
            } />

            <Route path="/apartado/:id" element={
              <PrivateRoute><ApartadoPage /></PrivateRoute>
            } />

          <Route path="/quejas" element={
  <PrivateRoute>
    <QuejasPage />
  </PrivateRoute>
} />

          </Route>


          {/* ===== RUTAS SIN BARRA ===== */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;