import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "../styles/ProductDetailPage.css";

//Context
import { useCart } from "../context/CartContext";

function ProductDetailPage() {
  const { id } = useParams(); //Hämtar produktens ID från URL:en (/products/:id)
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Startar på 1

  //context
  const { addToCart } = useCart();

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

          {/* Add to cart, anropar metod från context */}
          <button
            className="product-detail__add-btn"
            onClick={() => addToCart(product, quantity)}
          >
            Add to cart <ShoppingCart size={18} />
          </button>

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
