// api.js – hanterar all kommunikation med backend + token-hantering i localStorage
// Genom att samla detta här slipper vi upprepa samma kod i varje komponent

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "aura_token"; // Nyckeln vi sparar token under i localStorage

// token hantering -----------------

// Sparar token i localStorage efter lyckad login/register
export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// Hämtar token – används när vi skickar skyddade requests
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Tar bort token – anropas vid logout
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Kollar om användaren är inloggad (token finns)
export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY); // !! omvandlar till true/false
}

// ── AUTH-HEADER ──────────────────────────────────────────────

// Returnerar headers med token – används vid skyddade API-anrop
export function authHeader() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// ── API-ANROP ────────────────────────────────────────────────

// Loggar in användaren – returnerar { _id, firstName, username, email, token }
export async function loginUser(username, password) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

// Registrerar ny användare – returnerar samma som login
export async function registerUser(formData) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

// Hämtar inloggad användares profil (favorites etc.)
export async function getMe() {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: authHeader(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not fetch user");
  }

  return data;
}

// Togglar en favorit – samma endpoint hanterar add och remove
export async function toggleFavorite(productId) {
  const res = await fetch(`${API_URL}/users/favorites/${productId}`, {
    method: "PUT",
    headers: authHeader(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not update favorites");
  }

  return data; // { favorites: [...] }
}

// Skapar en order – user kopplas på backend om token finns
export async function createOrder(orderData) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not create order");
  }

  return data;
}

// Hämtar inloggad användares ordrar
export async function getMyOrders() {
  const res = await fetch(`${API_URL}/orders/myorders`, {
    headers: authHeader(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not fetch orders");
  }

  return data;
}
