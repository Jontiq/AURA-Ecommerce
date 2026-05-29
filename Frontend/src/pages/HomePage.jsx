import { Link } from "react-router-dom";
import "../styles/HomePage.css";

//Kategori-data, varje objekt har ett namn och en bild
const CATEGORIES = [
  { name: "ALL",    image: "/src/assets/images/category-niche.png" },
  { name: "WOMEN",  image: "/src/assets/images/category-women.png" },
  { name: "MEN",    image: "/src/assets/images/category-men.png" },
  { name: "UNISEX", image: "/src/assets/images/category-unisex.png" },
];

// Doft-data, namn och bild på varje cirkel
const SCENTS = [
  { name: "Citrus", image: "/src/assets/images/scent-citrus.png" },
  { name: "Woody", image: "/src/assets/images/scent-woody.png" },
  { name: "Floral", image: "/src/assets/images/scent-floral.png" },
  { name: "Fresh", image: "/src/assets/images/scent-fresh.png" },
  { name: "Amber", image: "/src/assets/images/scent-amber.png" },
  { name: "Musky", image: "/src/assets/images/scent-musky.png" },
  { name: "Spicy", image: "/src/assets/images/scent-spicy.png" },
];

function Homepage() {
  return (
    <div className="home">
      {/* SEKTION 1: HERO */}
      <section className="hero">
        <img
          src="/src/assets/images/hero-bg-better.png"
          alt="AURA HeroImage"
          className="hero__image"
        />
        {/* Texten ligger ovanpå bilden */}
        <div className="hero__content">
          <h1 className="hero__title">Define Your Presence</h1>
          <p className="hero__text">
            We curate refined fragrances that elevate your presence and express
            individuality. Each scent is selected to leave a lasting impression.
          </p>
          <p className="hero__text">
            Subtle, powerful and{" "}
            <span className="hero__underline">unforgettable.</span>
          </p>
          <p className="hero__tagline">
            Find your <strong>AURA</strong>.
          </p>
        </div>
      </section>

      {/* ── SEKTION 3: CURATED SCENTS ── */}
      <section className="scents">
        <h2 className="section-title">Our Curated Scents</h2>
        <div className="scents__grid">
          {SCENTS.map((scent) => (
            <Link
              key={scent.name}
              to={`/products?note=${scent.name.toLowerCase()}`}
              className="scent-item"
            >
              <img
                src={scent.image}
                alt={scent.name}
                className="scent-item__image"
              />
              <span className="scent-item__name">{scent.name}</span>
            </Link>
          ))}
        </div>
      </section>
      {/* ── SEKTION 2: CATEGORIES ── */}
      <section className="categories">
        <h2 className="section-title">Categories</h2>
        <div className="categories__grid">
          {/* loopar igenom CATEGORIES-array och skapar ett kort per kategori */}
          {CATEGORIES.map((category) => (
            // Link skickar med kategorin som query-parameter till ProductsPage, ska aktivera filter senare
            <Link
              key={category.name}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="category-card"
            >
              <img
                src={category.image}
                alt={category.name}
                className="category-card__image"
              />
              {/* Overlay med gradient så texten syns mot bilden, kanske ändrar detta och bara har svart text i övre del av bilden */}
              <div className="category-card__overlay">
                <span className="category-card__name">
                  {category.name.toUpperCase()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SEKTION 4: CTA-BANNER ── */}
      <section className="cta">
        <img
          src="/src/assets/images/scentworkshop-bg.png"
          alt="Our Collection"
          className="cta__image"
        />
        <div className="cta__content">
          <h2 className="cta__title">
            Looking for your perfect scent?
            <br />
            Let us help you find it.
          </h2>
          <Link to="/products" className="cta__button">
            Explore Collection →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Homepage;

