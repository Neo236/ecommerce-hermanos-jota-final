
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx'; // 1. Importa el CartProvider

import './style.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* 2. Envuelve la App con el CartProvider */}
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)