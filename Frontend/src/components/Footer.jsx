//importerar link för att ha klickbara texter (istället för <a> )
import { Link } from "react-router-dom";
import "../styles/Footer.css";

// SVG-ikoner :)
const LinkedInIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622z"/>
  </svg>
);



const Footer = () => {
  return (
    <footer className="footer">
      {/* ÖVRE DEL – Logo + sociala medier */}
      <div className="footer__top">
        {/* VÄNSTER – logo + sociala ikoner */}
        <div className="footer__top-left">
          <span className="footer__logo">AURA</span>
          <div className="footer__socials">
            <a href="#">
              <LinkedInIcon />
            </a>
            <a href="#">
              <InstagramIcon />
            </a>
            <a href="#">
              <FacebookIcon />
            </a>
            <a href="#">
              <XIcon />
            </a>
          </div>
        </div>

        {/* HÖGER – nav-länkar */}
        <div className="footer__links">
          <Link to="/">Home</Link>
          <Link to="#">About</Link>
          <Link to="/products">Shop</Link>
          <Link to="#">Contact</Link>
          <Link to="/account">Account</Link>
        </div>
      </div>

      {/* UNDRE DEL – Juridiska länkar + copyright */}
      <div className="footer__bottom">
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Settings</a>
        </div>
        {/* Linjen + copyright via border-top på denna element */}
        <p className="footer__copyright">©2026. All Rights Reserved AURA</p>
      </div>
    </footer>
  );
};

export default Footer;
