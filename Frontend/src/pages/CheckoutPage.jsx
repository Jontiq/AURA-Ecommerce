import { useEffect } from "react";
// ÄNDRA HÄR: Importera useCart med måsvingar istället för CartContext!
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  // Här använder vi din färdiga genväg! Den hämtar automatiskt allt från Contexten under huven
  const { cartItems, totalPrice, totalItems } = useCart();

  useEffect(() => {
    console.log("--- KASSAN HAR LADDATS ---");
    console.log({ cartItems, totalItems, totalPrice });
  }, []); // Loggar en gång vid rendering

  return (
    <div>
      <h1>Checkout Page</h1>
    </div>
  );
};

export default CheckoutPage;
