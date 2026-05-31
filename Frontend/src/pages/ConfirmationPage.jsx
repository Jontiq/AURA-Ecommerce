import { useLocation, Link } from "react-router-dom";
import "../styles/ConfirmationPage.css";

// Formaterar ordernummer med nollor, t.ex. 1 →000001
const formatOrderNumber = (id) => {
  return `#${String(id).toUpperCase()}`;
};

function ConfirmationPage() {
  const { state } = useLocation();
  //Finns state? ge order!
  const order = state?.order;

  // Om användaren navigerar hit direkt utan order-data
  if (!order) {
    return (
      <div className="confirmation confirmation--empty">
        <p>No order found.</p>
        <Link to="/products" className="confirmation__btn">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="confirmation">
      {/* ── Checkmark-ikon ── */}
      <div className="confirmation__icon">
        <img src="/src/assets/images/check-mark-logo.png" alt="ConfirmationLogo" />
      </div>

      {/* ── Titel + subtitle ── */}
      <h1 className="confirmation__title">Thank you for your order!</h1>
      <p className="confirmation__subtitle">
        Your order has been successfully placed and will be shipped soon.
      </p>

      {/* ── Order-kort ── */}
      <div className="confirmation__card">
        {/* Ordernummer */}
        <div className="confirmation__section">
          <span className="confirmation__label">Order Number</span>
          <span className="confirmation__order-number">
            {formatOrderNumber(order._id)}
          </span>
        </div>

        <hr className="confirmation__divider" />

        {/* Order summary */}
        <div className="confirmation__section">
          <span className="confirmation__label">Order Summary</span>
          <div className="confirmation__items">
            {order.items.map((item, index) => (
              <div key={index} className="confirmation__item">
                <span className="confirmation__item-name">
                  {item.name}
                  <span className="confirmation__item-qty">
                    {" "}
                    x {item.quantity}
                  </span>
                </span>
                <span className="confirmation__item-total">
                  ${item.itemTotal.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <hr className="confirmation__divider" />

        {/* Total */}
        <div className="confirmation__total">
          <span>Total</span>
          <span className="confirmation__total-price">
            ${order.orderTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* ── Continue Shopping ── */}
      <Link to="/products" className="confirmation__btn">
        Continue Shopping
      </Link>
    </div>
  );
}

export default ConfirmationPage;
