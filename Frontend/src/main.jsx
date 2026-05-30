import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./styles/variables.css"; //Vårt "Tema"
import "./styles/global.css"; //För att fixa lite buggar i vyn
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* CART PROVIDER, HÅLLER KOLL PÅ INNEHÅLLET I KASSAN OCH DESS FUNKTIONER */}
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
