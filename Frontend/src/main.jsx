import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./styles/variables.css"; //Vårt "Tema"
import "./styles/global.css"; //För att fixa lite buggar i vyn

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
