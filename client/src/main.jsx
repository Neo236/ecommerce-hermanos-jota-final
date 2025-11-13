// /client/src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // 1. Importamos nuestro AuthProvider

import './style.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. Envolvemos la App con el AuthProvider */}
      {/* Esto debe estar DENTRO de BrowserRouter para que el contexto pueda usar hooks de ruteo si es necesario */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)