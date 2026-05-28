import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation(); //Pathname = URL, hämtar aktuell url från useLocatio
  console.log(pathname);

  useEffect(() => {
    window.scrollTo(0, 0); //kordinater på sidan
  }, [pathname]); // Körs varje gång URL:en ändras

  return null; // Renderar ingenting, bara logik
}

export default ScrollToTop;
