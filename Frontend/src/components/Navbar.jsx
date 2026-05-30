//useRef kan hålla en variabel kvar trots att en sida omrenderas osv. annars hade variabeln nollställts till standardvärde.
import { useState, useEffect, useRef } from "react";
//importerar link för att ha klickbara texter (istället för <a> )
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; //Styling
import  {User, ShoppingCart, Menu, X} from "lucide-react"; //Hämtar färdiga ikoner

//Context
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; 

function Navbar() {
  // Håller koll på om mobilmenyn är öppen eller stängd
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  //Ref för att detektera klick utanför sökfältet, hjälper till att stänga / ta bort dropdown om man klickat utanför t.ex
  const searchRef = useRef(null);
  const hamburgerRef = useRef(null);

  //context
  const { totalItems } = useCart();
   const { authed } = useAuth();

  //Hämtar produkter och filtrerar medan användaren skriver
  useEffect(() => {
    //Om sökfältet är tomt, visa ingen dropdown
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    //Det finns ett värde i sökfält
    const fetchResults = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        const filtered = data.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setSearchResults(filtered.slice(0, 5)); //Max 5 träffar i dropdown så att användaren inte blir maxad
        setShowDropdown(true);
      } catch (error) {
        console.error("Search failed:", error.message);
        setShowDropdown(false);
      }
    };
    fetchResults();
  }, [searchQuery]);

  // Stänger dropdowns/menyer om man klickar utanför dem
  useEffect(() => {
    function handleSearchOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleSearchOutside);
    return () => document.removeEventListener("mousedown", handleSearchOutside);
  }, []);


//SEPARAT UTKAST FÖR HAMBURGARMENYN
useEffect(() => {
  function handleHamburgerOutside(e) {
    if (hamburgerRef.current && !hamburgerRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  }
  document.addEventListener("mousedown", handleHamburgerOutside);
  return () =>
    document.removeEventListener("mousedown", handleHamburgerOutside);
}, []);

  // Enter = navigera till ProductsPage med sökterm
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setShowDropdown(false);
      navigate(`/products?search=${searchQuery.trim()}`);
    }
  };

  // Klickar på en direktträff > ProductDetailPage
  const handleResultClick = () => {
    setSearchQuery("");
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      {/* Gemensam wrapper för allt som rör mobilmenyn så klick inuti menyn inte stänger den direkt */}
      <div ref={hamburgerRef} className="navbar__mobile-wrapper">
        {/* Hamburgare – egen div, syns bara på mobil */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* ── MOBIL DROPDOWN-MENY, If statement fast "short-circuit evaluation, om true visa nedan element*/}
        {menuOpen && (
          <div className="navbar__dropdown">
            <Link
              to="/products"
              className="navbar__dropdown-link"
              onClick={() => setMenuOpen(false)}
            >
              Discover Collection
            </Link>
            <Link
              to={authed ? "/account" : "/login"}
              className="navbar__dropdown-link"
              onClick={() => setMenuOpen(false)}
            >
              {authed ? "Account" : "Login"}
            </Link>
          </div>
        )}
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      {/* TILL VÄNTSER, LOGO + LINK */}
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">
          AURA
        </Link>
        <Link to="/products" className="navbar__link">
          Discover Collection
        </Link>
      </div>

      {/* MITTEN, SEARCHBAR */}
      <div className="navbar__center" ref={searchRef}>
        <input
          type="text"
          placeholder="Search perfume..."
          className="navbar__search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchSubmit}
        />

        {/* Dropdown med direktträffar */}
        {showDropdown && (
          <div className="navbar__search-dropdown">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="navbar__search-result"
                  onClick={handleResultClick}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="navbar__search-result-image"
                  />
                  <div className="navbar__search-result-info">
                    <span className="navbar__search-result-brand">
                      {product.brand}
                    </span>
                    <span className="navbar__search-result-name">
                      {product.name}
                    </span>
                  </div>
                  <span className="navbar__search-result-price">
                    ${product.price}
                  </span>
                </Link>
              ))
            ) : (
              <p className="navbar__search-empty">No products found</p>
            )}
          </div>
        )}
      </div>

      {/* HÖGER, IKONER (KONTO OCH KASSA samt count för hur många artiklar i kassan(just nu hårdkodad till 0)) */}
      <div className="navbar__right">
        <Link
          to={authed ? "/account" : "/login"}
          className="navbar__icon desktop-only"
        >
          <User size={24} />
        </Link>
        <Link to="/checkout" className="navbar__icon">
          <ShoppingCart size={24} />
          {/* Hämtar totalt antal artiklar i kassan från cartContext via totalItems */}
          <span className="navbar__badge">{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

