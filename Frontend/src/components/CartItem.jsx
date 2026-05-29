import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

function CartItem({ item, updateQuantity, removeFromCart }) {
  // Lokalt state för fältet (precis som på din ProductDetailPage)
  const [quantity, setQuantity] = useState(item.quantity);

  // Håll det lokala statet synkat om kundvagnen uppdateras utifrån (t.ex. via knappar)
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item__image" />

      {/* display:contents på desktop → flex-column på mobil */}
      <div className="cart-item__right">
        {/* Desktop kol 2 / Mobil rad 1: Namn + Brand + Pris */}
        <div className="cart-item__info">
          <h3 className="cart-item__name">{item.name}</h3>
          <span className="cart-item__brand">{item.brand}</span>
          <span className="cart-item__price">${item.price}</span>
        </div>

        {/* Mobil rad 2: Pris + Total — döljs på desktop */}
        <div className="cart-item__price-total-row">
          <span className="cart-item__price">${item.price}</span>
          <div className="cart-item__total-col">
            <span className="cart-item__label">Total</span>
            <span className="cart-item__total">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Desktop kol 3 / Mobil rad 3: Quantity */}
        <div className="cart-item__quantity-col">
          <span className="cart-item__label">Quantity</span>
          <div className="cart-item__quantity">
            <button
              className="cart-qty-btn"
              onClick={handleDecrease}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              className="cart-qty-input"
              value={quantity} // Styrs av lokala statet
              min="1"
              onFocus={(e) => e.target.select()} // Markerar all text vid klick
              onChange={(e) => {
                const val = e.target.value;

                // Tillåt tomt fält lokalt medan man skriver!
                if (val === "") {
                  setQuantity("");
                  return;
                }

                const num = parseInt(val);
                if (!isNaN(num) && num >= 1) {
                  setQuantity(num);
                  updateQuantity(item.id, num); // Uppdaterar context i bakgrunden
                }
              }}
              onBlur={() => {
                // Återställ till 1 om fältet lämnas tomt eller ogiltigt
                if (quantity === "" || quantity < 1) {
                  setQuantity(1);
                  updateQuantity(item.id, 1);
                }
              }}
            />
            <button
              className="cart-qty-btn"
              onClick={handleIncrease}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Desktop kol 4: Total */}
        <div className="cart-item__total-col">
          <span className="cart-item__label">Total</span>
          <span className="cart-item__total">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        {/* Delete */}
        <button
          className="cart-item__remove"
          onClick={() => removeFromCart(item.id)}
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
