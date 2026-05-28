import { createContext, useContext, useState, useEffect } from "react";

//Skapar CartContext
const CartContext = createContext();

// Custom hook för att enkelt komma åt cart i vilken komponent som helst
// Istället för att skriva useContext(CartContext) överallt skriver vi bara useCart()
export function useCart() {
  return useContext(CartContext);
}

//Provider - komponent som omsluter hela appen i main.jsx / index.jsx
export function CartProvider({ children }) {
  // Försöker läsa från localStorage vid uppstart, annars tom array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("aura-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
        //Om något går fel får vi logga iaf
        console.error("Error when loading cart from localstorage.")
        //Räddar iaf applikationen så den inte krashar
      return [];
    }
  });

  // Sparar till localStorage varje gång cartItems ändras genom en inbyggd metod från localstorage och omvandlar det från json till sträng
  useEffect(() => {
    localStorage.setItem("aura-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Lägger till produkt. Om den redan finns ökar vi quantity istället. Skickar man inte med något quantity så blir standard 1st
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
        //Find är en inbyggd metod för att leta igenom en array.
      const existing = prev.find((item) => item.id === product.id);
      //om produkten existerar i cart
      if (existing) {
        //for each product i cart
        return prev.map((item) =>
          //if id matchar
          item.id === product.id
            ? //hämta hela item objektet genom ...item, sen säger vi att vi ska uppdatera quantity, och att quantity är item.quantity + quantity
              { ...item, quantity: item.quantity + quantity }
              //gör inget
            : item,
        );
      }
      //Om inte existing, lägg till den nya produken i setCartItems + den nya produkten och dess quantity
      return [...prev, { ...product, quantity }];
    });
  };

  // Tar bort produkt helt från cart
  const removeFromCart = (productId) => {
    //prev blir istället cartItems filtrerad baserat på id:t vi skickade in
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Uppdaterar quantity för en specifik produkt
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  // Tömmer hela varukorgen, osäker om vi bygger in funktion
  const clearCart = () => {
    setCartItems([]);
  };

  // Räknar ut totala antalet produkter (för badge i navbar). Sum representerar totalt antal.
  //För varje item, ta antal och lägg in i sum. 0:an avser startvärdet.
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Räknar ut totala priset
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
        {/* dvs app.js */}
      {children}
    </CartContext.Provider>
  );
}
