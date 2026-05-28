import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

//Context
import { useCart } from "../context/CartContext";

function ProductCard({ product}) {
  //Context funktion
  const { addToCart } = useCart();
  return (
    // Klickar man på kortet -> ProductDetailPage
    <Link to={`/products/${product.id}`} className="product-card">
      {/*BILD*/}
      <div className="product-card__image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
        />
      </div>

      {/*INFO*/}
      <div className="product-card__info">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__bottom">
          <span className="product-card__price">${product.price}</span>
          {/*Stoppar klick-eventet så man inte navigerar till detail när man klickar Add to cart, för det ska läggas till direkt i cart ist*/}
          <button
            className="product-card__button"
            onClick={(e) => {
              e.preventDefault();
              //Lägger till i kassan via contextfunktionen
              addToCart(product, 1);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
