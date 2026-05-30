import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem"; // 👈 Den nya importen
import "../styles/CheckoutPage.css";

function CheckoutPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("swish");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors = {};

    //Kolla om fält är tomma (och ge dem ett anpassat meddelande)
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.streetAddress.trim())
      newErrors.streetAddress = "Street address is required";
    if (!form.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";

    //Validera e-post (både om den är tom och om formatet är fel)
    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    //Validera telefonnummer
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      // Tillåter siffror, mellanslag, bindestreck och ett inledande plus (+)
      const phoneRegex = /^\+?[0-9\s\-]{6,15}$/;
      if (!phoneRegex.test(form.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isCartEmpty = cartItems.length === 0;

  const handlePlaceOrder = async () => {
    if (isCartEmpty) return;
    if (!validate()) return;

    const order = {
      userId: null,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        quantity: item.quantity,
        itemTotal: item.price * item.quantity,
      })),
      shipping: form,
      paymentMethod,
      orderTotal: totalPrice,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      clearCart();
      navigate("/confirmation", { state: { order: data } });
    } catch (err) {
      console.error("Failed to place order:", err.message);
    }
  };

  return (
    <div className="checkout">
      {isCartEmpty ? (
        <div className="checkout__empty-state">
          <p className="checkout__empty">Your cart is empty.</p>
          <Link to="/products" className="checkout__start-shopping">
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* ══ CART ══ */}
          <div className="checkout__cart-header">
            <h1 className="checkout__title">Your Cart</h1>
            <Link to="/products" className="checkout__continue">
              Continue Shopping
            </Link>
          </div>

          {/* Clean och snygg mappning med den nya komponenten */}
          <div className="checkout__items">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <hr className="checkout__divider" />

          {/* ══ SHIPPING ══ */}
          <h2 className="checkout__section-title">Shipping Information</h2>

          <div className="checkout__form">
            <div className="form-row">
              <div className="form-field">
                <div className="form-label-row">
                  <label className="form-label">First Name</label>
                  {errors.firstName && (
                    <span className="form-error-msg">{errors.firstName}</span>
                  )}
                </div>
                <input
                  className={`form-input ${errors.firstName ? "form-input--error" : ""}`}
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <div className="form-label-row">
                  <label className="form-label">Last Name</label>
                  {errors.lastName && (
                    <span className="form-error-msg">{errors.lastName}</span>
                  )}
                </div>
                <input
                  className={`form-input ${errors.lastName ? "form-input--error" : ""}`}
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-field">
              <div className="form-label-row">
                <label className="form-label">Street Address</label>
                {errors.streetAddress && (
                  <span className="form-error-msg">{errors.streetAddress}</span>
                )}
              </div>

              <input
                className={`form-input ${errors.streetAddress ? "form-input--error" : ""}`}
                type="text"
                name="streetAddress"
                value={form.streetAddress}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <div className="form-label-row">
                  <label className="form-label">Postal Code</label>
                  {errors.postalCode && (
                    <span className="form-error-msg">{errors.postalCode}</span>
                  )}
                </div>

                <input
                  className={`form-input ${errors.postalCode ? "form-input--error" : ""}`}
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <div className="form-label-row">
                  <label className="form-label">City</label>
                  {errors.city && (
                    <span className="form-error-msg">{errors.city}</span>
                  )}
                </div>

                <input
                  className={`form-input ${errors.city ? "form-input--error" : ""}`}
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-field">
              <div className="form-label-row">
                <label className="form-label">Email</label>
                {errors.email && (
                  <span className="form-error-msg">{errors.email}</span>
                )}
              </div>
              <input
                className={`form-input ${errors.email ? "form-input--error" : ""}`}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <div className="form-label-row">
                <label className="form-label">Phone</label>
                {errors.phone && (
                  <span className="form-error-msg">{errors.phone}</span>
                )}
              </div>

              <input
                className={`form-input ${errors.phone ? "form-input--error" : ""}`}
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ══ PAYMENT ══ */}
          <h2 className="checkout__section-title">Payment Method</h2>

          <div className="payment-options">
            <label
              className={`payment-option ${paymentMethod === "swish" ? "payment-option--active" : ""}`}
            >
              <input
                type="radio"
                name="payment"
                value="swish"
                checked={paymentMethod === "swish"}
                onChange={() => setPaymentMethod("swish")}
              />
              <span className="payment-option__label">Swish</span>
              <div className="payment-option__logos">
                <img
                  src="/src/assets/images/swish-logo.png"
                  alt="Swish"
                  className="payment-option__logo"
                />
              </div>
            </label>

            <label
              className={`payment-option ${paymentMethod === "card" ? "payment-option--active" : ""}`}
            >
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span className="payment-option__label">
                Credit card / Debit card
              </span>
              <div className="payment-option__logos">
                <img
                  src="/src/assets/images/mastercard-logo.png"
                  alt="Mastercard"
                  className="payment-option__logo"
                />
                <img
                  src="/src/assets/images/visa-logo.png"
                  alt="Visa"
                  className="payment-option__logo"
                />
              </div>
            </label>
          </div>

          <div className="checkout__total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            className={`checkout__place-order ${isCartEmpty ? "checkout__place-order--disabled" : ""}`}
            onClick={handlePlaceOrder}
            disabled={isCartEmpty}
          >
            Place Order <ShoppingCart size={18} />
          </button>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
