import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Layout (AQUÍ está la barra)
import MainLayout from "./components/MainLayout/MainLayout";

// Páginas
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ApartadoPage from "./pages/ApartadoPage";
import HistorialPage from "./pages/HistorialPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

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

            <Route
              path="/carrito"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/historial"
              element={
                <PrivateRoute>
                  <HistorialPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/apartado/:id"
              element={
                <PrivateRoute>
                  <ApartadoPage />
                </PrivateRoute>
              }
            />

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
