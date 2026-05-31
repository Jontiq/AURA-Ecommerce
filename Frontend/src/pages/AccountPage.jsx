import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMe, getMyOrders } from "../api";
import "../styles/AccountPage.css";

function AccountPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hämtar användardata och ordrar parallellt för snabbhet
        const [userData, ordersData] = await Promise.all([
          getMe(),
          getMyOrders(),
        ]);
        setUser(userData);
        setOrders(ordersData);
      } catch (err) {
        console.error("Failed to fetch account data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  // Formaterar datum från "2026-01-01T00:00:00.000Z" → "2026-01-01"
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  if (loading) return <p className="account__status">Loading...</p>;

  return (
    <div className="account">
      {/* ── HEADER ── */}
      <div className="account__header">
        <h1 className="account__title">My Account</h1>
        <button className="account__signout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      {/* ── INNEHÅLL – två kolumner på desktop ── */}
      <div className="account__content">
        {/* VÄNSTER – Profilinformation */}
        <section className="account__section">
          <h2 className="account__section-title">Profile Information</h2>
          <div className="account__card">
            <div className="account__field">
              <span className="account__label">Name</span>
              <span className="account__value">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <div className="account__field">
              <span className="account__label">Username</span>
              <span className="account__value">@{user?.username}</span>
            </div>
            <div className="account__field">
              <span className="account__label">Email</span>
              <span className="account__value">{user?.email}</span>
            </div>
          </div>
        </section>

        {/* HÖGER – Orderhistorik */}
        <section className="account__section">
          <h2 className="account__section-title">Order History</h2>

          {orders.length === 0 ? (
            <p className="account__empty">You have no orders yet.</p>
          ) : (
            <div className="account__orders">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  {/* Order header */}
                  <div className="order-card__header">
                    <div>
                      <span className="order-card__number">
                        Order #{order._id.toUpperCase()}
                      </span>
                      <span className="order-card__date">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Produktrader */}
                  <div className="order-card__items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-card__item">
                        <span className="order-card__item-name">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="order-card__item-price">
                          ${item.itemTotal}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="order-card__footer">
                    <span className="order-card__total-label">Total</span>
                    <span className="order-card__total-price">
                      ${order.orderTotal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AccountPage;
