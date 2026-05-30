import { useState, createContext, useContext } from "react";
import { isAuthenticated, saveToken, removeToken } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Är användaren inloggad? Kollar localStorage direkt vid start
  const [authed, setAuthed] = useState(isAuthenticated());

  function login(userData) {
    saveToken(userData.token);
    localStorage.setItem("aura_user", JSON.stringify(userData));
    setAuthed(true);
  }

  function logout() {
    removeToken();
    localStorage.removeItem("aura_user");
    setAuthed(false);
  }

  return (
    <AuthContext.Provider value={{ authed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
