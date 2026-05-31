import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// Wrappas runt routes som kräver inloggning.
// Om authed: visa sidan. Om inte: skicka till /login.
function ProtectedRoute({ children }) {
  const { authed } = useAuth();

  if (!authed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
