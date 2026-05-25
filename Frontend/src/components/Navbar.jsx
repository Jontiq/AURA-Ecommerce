//importerar link för att ha klickbara texter (istället för <a> )
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; //Styling
import  {User, ShoppingCart, Menu, X} from "lucide-react"; //Hämtar färdiga ikoner

const Navbar = () => {
  // Håller koll på om mobilmenyn är öppen eller stängd
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Hamburgare – egen div, syns bara på mobil */}
      <button
        className="navbar__hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {/* ── DESKTOP LAYOUT ── */}
      {/* TILL VÄNTSER, LOGO + LINK */}
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">AURA</Link>
        <Link to="/products" className="navbar__link">Discover Collection</Link>
      </div>

      {/* MITTEN, SEARCHBAR */}
      <div className="navbar__center">
        <input
          type="text"
          placeholder="Search perfume..."
          className="navbar__search"
        />
      </div>

      {/* HÖGER, IKONER (KONTO OCH KASSA samt count för hur många artiklar i kassan(just nu hårdkodad till 0)) */}
      <div className="navbar__right">
        <Link to="/account" className="navbar__icon desktop-only">
          <User size={24} />
        </Link>
        <Link to="/checkout" className="navbar__icon">
          <ShoppingCart size={24} />
          <span className="navbar__badge">0</span>
        </Link>
      </div>

      {/* ── MOBIL DROPDOWN-MENY, If statement fast "short-circuit evaluation, om true, gå vidare" ── */}
      {menuOpen && (
        <div className="navbar__dropdown">
          <Link
            to="/products"
            className="navbar__dropdown-link"
            onClick={() => setMenuOpen(false)} // Stänger menyn när man klickar
          >
            Discover Collection
          </Link>
          <Link
            to="/account"
            className="navbar__dropdown-link"
            onClick={() => setMenuOpen(false)}
          >
            Account
          </Link>
        </div>
      )}
    </nav>
  );
};;

export default Navbar;

