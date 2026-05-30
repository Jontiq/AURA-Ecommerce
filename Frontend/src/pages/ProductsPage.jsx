import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/ProductsPage.css";

//Alla tillgängliga notes i dropdown
const ALL_NOTES = [
  "Lavender",
  "Citrus",
  "Woody",
  "Sweet",
  "Rose",
  "Vanilla",
  "Jasmine",
  "Sandalwood",
  "Bergamot",
  "Amber",
];

const CATEGORIES = ["All", "Women", "Men", "Unisex"];

function ProductsPage() {
  //Produkter hämtade från json-server
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter-state
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [notesOpen, setNotesOpen] = useState(false); // dropdown öppen/stängd

  const navigate = useNavigate();
  // Läser URL-parametrar (t.ex. ?search=armani eller ?category=men)
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";
  const noteParam = searchParams.get("note") || "";

  const notesRef = useRef(null);

  //För att stänga notesdropdown om man klickar utanför
  useEffect(() => {
    function handleNotesOutside(e) {
      if (notesRef.current && !notesRef.current.contains(e.target)) {
        setNotesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleNotesOutside);
    return () => document.removeEventListener("mousedown", handleNotesOutside);
  }, []);

  // Sätter aktiv kategori från URL-parameter (t.ex. från HomePage-kort)
  useEffect(() => {
    if (categoryParam) {
      const match = CATEGORIES.find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase(),
      );
      if (match) setActiveCategory(match);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (noteParam) {
      const match = ALL_NOTES.find(
        (n) => n.toLowerCase() === noteParam.toLowerCase(),
      );
      if (match) setSelectedNotes([match]);
    }
  }, [noteParam]);

  // Hämtar produkter från json-server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Togglar en note i/ur selectedNotes-arrayen
  const toggleNote = (note) => {
    setSelectedNotes(
      (prev) =>
        prev.includes(note)
          ? prev.filter((n) => n !== note) // Ta bort om redan vald
          : [...prev, note], // Lägg till om inte vald
    );
  };

  // Rensar alla filter
  const clearFilters = () => {
    setActiveCategory("All");
    setSelectedNotes([]);
  };

  // Filtrerar produkter baserat på alla aktiva filter + sökterm
  const filteredProducts = products.filter((product) => {
    // Kategorifilter
    const categoryMatch =
      activeCategory === "All" ||
      product.categories.includes(activeCategory);

    // Notes-filter produkten måste ha ALLA valda notes (görs via every)
    const notesMatch =
      selectedNotes.length === 0 ||
      selectedNotes.every((note) => product.notes.includes(note));

    // Sökfilter kollar namn och brand
    const searchMatch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && notesMatch && searchMatch;
  });

  const hasActiveFilters = activeCategory !== "All" || selectedNotes.length > 0;

  return (
    <div className="products-page">
      {/*HERO*/}
      <section className="products-hero">
        <img
          src="/src/assets/images/products-hero.png"
          alt="Our Collection"
          className="products-hero__image"
        />
        <div className="products-hero__overlay">
          <h1 className="products-hero__title">Our Collection</h1>
        </div>
      </section>

      {/* ── FILTER-SEKTION ── */}
      <section className="products-filter">
        {/* Sökresultat-rubrik */}
        {searchQuery && (
          <div className="products-filter__search-row">
            <p className="products-filter__search-label">
              Search results for <strong>"{searchQuery}"</strong>
            </p>
            <button
              className="filter-clear"
              onClick={() => navigate("/products")}
            >
              Clear search
            </button>
          </div>
        )}

        {/* Filterknappar */}
        <div className="products-filter__row">
          <span className="products-filter__label">Filter</span>

          {/* Kategoriknappar */}
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "filter-btn--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}

          {/*Notes dropdown-knapp*/}
          <div className="notes-dropdown" ref={notesRef}>
            <button
              className="filter-btn notes-dropdown__trigger"
              onClick={() => setNotesOpen(!notesOpen)}
            >
              Notes{" "}
              {selectedNotes.length > 0 ? `(${selectedNotes.length})` : ""}
              <span>{notesOpen ? "▲" : "▼"}</span>
            </button>

            {/*Dropdown-lista*/}
            {notesOpen && (
              <div className="notes-dropdown__menu">
                {ALL_NOTES.map((note) => (
                  <label key={note} className="notes-dropdown__item">
                    <input
                      type="checkbox"
                      checked={selectedNotes.includes(note)}
                      onChange={() => toggleNote(note)}
                    />
                    {note}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Aktiva notes-taggar + Clear filters */}
        {(selectedNotes.length > 0 || hasActiveFilters) && (
          <div className="products-filter__tags">
            {selectedNotes.map((note) => (
              <span
                key={note}
                className="filter-tag"
                onClick={() => toggleNote(note)}
              >
                {note} ✕
              </span>
            ))}
            {hasActiveFilters && (
              <button className="filter-clear" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>
        )}
      </section>

      {/* ── PRODUKTGRID ── */}
      <section className="products-grid-section">
        {loading ? (
          <p className="products-empty">Loading products...</p>
        ) : error ? (
          <p className="products-empty">Something went wrong: {error}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="products-empty">No products match your filters.</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={(p) => console.log("Add to cart:", p)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductsPage;
