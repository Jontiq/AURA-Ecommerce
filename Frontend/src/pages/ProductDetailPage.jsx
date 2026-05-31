import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import "../styles/ProductDetailPage.css";

//Context
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getMe, toggleFavorite } from "../api"; 

function ProductDetailPage() {
  const { id } = useParams(); //Hämtar produktens ID från URL:en (/products/:id)
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Startar på 1

  // Favorites-state
  const [isFavorited, setIsFavorited] = useState(false); // Är produkten favoritad?
  const [showTooltip, setShowTooltip] = useState(false); // Visa tooltip om ej inloggad

  //context
  const { addToCart } = useCart();
  const { authed } = useAuth(); // 👈 NY

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Körs om när id i URL:en ändras

  // Om inloggad, kolla om produkten redan är favoritad
  useEffect(() => {
    if (!authed) return;
    const checkFavorite = async () => {
      try {
        const user = await getMe();
        // Kollar om produktens id finns i användarens favorites-array
        setIsFavorited(user.favorites.includes(id));
      } catch (err) {
        console.error("Failed to check favorites:", err.message);
      }
    };
    checkFavorite();
  }, [authed, id]);

  const handleFavoriteClick = async () => {
    //Ej inloggad, visa tooltip istället
    if (!authed) {
      setShowTooltip(true);
      // Döljer tooltip automatiskt efter 3 sekunder
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    try {
      await toggleFavorite(id);
      // Togglar lokalt state direkt – slipper hämta om hela användaren
      setIsFavorited((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle favorite:", err.message);
    }
  };

  // Minskar quantity, men aldrig under 1
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  if (loading) return <p className="detail-status">Loading...</p>;
  if (error)
    return <p className="detail-status">Something went wrong: {error}</p>;
  if (!product) return <p className="detail-status">Product not found.</p>;

  return (
    <div className="product-detail">
      <div className="product-detail__container">
        {/* VÄNSTER – Produktbild */}
        <div className="product-detail__image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-detail__image"
          />
        </div>

        {/* HÖGER – Produktinfo */}
        <div className="product-detail__info">
          {/* Brand + Namn + Pris */}
          <span className="product-detail__brand">{product.brand}</span>
          <h1 className="product-detail__name">{product.name}</h1>
          <p className="product-detail__price">${product.price}</p>

          {/* Volume */}
          <div className="product-detail__section">
            <span className="product-detail__label">Volume</span>
            <p className="product-detail__value">{product.volume}ml</p>
          </div>

          {/* Notes – visas som taggar */}
          <div className="product-detail__section">
            <span className="product-detail__label">Notes</span>
            <div className="product-detail__notes">
              {product.notes.map((note) => (
                <span key={note} className="product-detail__note-tag">
                  {/* Gör första bokstaven stor */}
                  {note.charAt(0).toUpperCase() + note.slice(1)}
                </span>
              ))}
            </div>
          </div>

          {/* Beskrivning – desktop: ovanför Add to cart */}
          <p className="product-detail__description desktop-description">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="product-detail__section">
            <span className="product-detail__label">Quantity</span>
            <div className="product-detail__quantity">
              <button
                className="quantity-btn"
                onClick={decreaseQuantity}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                className="quantity-input"
                value={quantity}
                min="1"
                onChange={(e) => {
                  const val = e.target.value;
                  // Tillåter tomt fält medan användaren skriver
                  if (val === "") {
                    setQuantity("");
                    return;
                  }
                  const num = parseInt(val);
                  if (!isNaN(num) && num >= 1) setQuantity(num);
                }}
                onBlur={() => {
                  // Återställer till 1 om fältet lämnas tomt
                  if (quantity === "" || quantity < 1) setQuantity(1);
                }}
              />
              <button
                className="quantity-btn"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>


          {/* ── Add to cart + Favorit-knapp ── */}
          <div className="product-detail__actions">
            <button
              className="product-detail__add-btn"
              onClick={() => addToCart(product, quantity)}
            >
              Add to cart <ShoppingCart size={18} />
            </button>

            {/* Favorit-knapp med tooltip-wrapper */}
            <div className="product-detail__fav-wrapper">
              <button
                className={`product-detail__fav-btn ${isFavorited ? "product-detail__fav-btn--active" : ""}`}
                onClick={handleFavoriteClick}
                aria-label="Add to favourites"
              >
                {/* Fyllt hjärta om favoritad, tomt annars */}
                <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
              </button>

              {/* Tooltip – visas om ej inloggad */}
              {showTooltip && (
                <div className="product-detail__tooltip">
                  Please log in to add favourites
                </div>
              )}
            </div>
          </div>

          {/* Beskrivning – mobil: under Add to cart */}
          <p className="product-detail__description mobile-description">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
