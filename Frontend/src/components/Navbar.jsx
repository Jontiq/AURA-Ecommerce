//importerar link för att ha klickbara texter (istället för <a> )
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; //Styling
import  {User, ShoppingCart} from "lucide-react"; //Hämtar färdiga ikoner

const Navbar = () =>{
    return (
      <nav className="navbar">
        {/* TILL VÄNTSER, LOGO + LINK */}
        <div className="navbar__left">
          <Link to="/" className="navbar__logo">
            AURA
          </Link>
          <Link to="/products" className="navbar__link">
            Discover Collection
          </Link>
        </div>

        {/* MITTEN, SEARCHBAR */}
        <div className="navbar__center">
          <input
            type="text"
            placeholder="Search perfume..."
            className="navbar__search"
          />
        </div>

        {/* HÖGER, IKONER (KONTO OCH KASSA samt count för hur många artiklar i kassan(just nu hårdkodad till 0)) */}
        <div className="navbar__right">
          <Link to="/account" className="navbar__icon">
            <User size={24} />
          </Link>
          <Link to="/checkout" className="navbar__icon">
            <ShoppingCart size={24} />
            <span className="navbar__badge">0</span>
          </Link>
        </div>
      </nav>
    );
};

export default Navbar;

