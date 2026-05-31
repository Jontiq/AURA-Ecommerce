import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMe } from "../api";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import "../styles/FavoritesPage.css";

function FavoritesPage() {
  const { authed } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // getMe() returnerar user med favorites-arrayen populerad
        const user = await getMe();

        // favorites på User-modellen är bara ID:n, vi behöver hämta
        // produktdata för varje ID
        const productRequests = user.favorites.map((id) =>
          fetch(`${import.meta.env.VITE_API_URL}/products/${id}`).then((r) =>
            r.json(),
          ),
        );
        const products = await Promise.all(productRequests);
        setFavorites(products);
      } catch (err) {
        console.error("Failed to fetch favorites:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (authed) fetchFavorites();
    else setLoading(false);
  }, [authed]);

  if (loading) return <p className="favorites__status">Loading...</p>;

  return (
    <div className="favorites">
      <h1 className="favorites__title">My Favourites</h1>

      {favorites.length === 0 ? (
        <div className="favorites__empty">
          <p>You haven't added any favourites yet.</p>
          <Link to="/products" className="favorites__link">
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="favorites__grid">
          {favorites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
