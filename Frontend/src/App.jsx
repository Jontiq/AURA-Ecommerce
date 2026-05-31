import { useState } from "react";

//Importerar Router för att kunna köra SPA :)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Alla pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import FavoritesPage from "./pages/FavoritesPage";

//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute"; //Auth

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      {/* global.css sätter #root till display: flex; flex-direction: column; min-height: 100vh. 
      Det betyder att Navbar, main och Footer staplas vertikalt. 
      flex: 1 på <main> säger "ta all återstående höjd", så Footer alltid trycks ned till botten */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
