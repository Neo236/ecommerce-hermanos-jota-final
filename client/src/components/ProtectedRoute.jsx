// /client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Este componente actuará como un "envoltorio" para nuestras rutas
const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth(); // Lee el estado de nuestro contexto

    // Si está autenticado, renderiza el componente hijo (la página)
    // 'Outlet' es el marcador de posición para el componente que estamos protegiendo
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
    // 'replace' evita que el usuario pueda "volver" a la página de admin con el botón de atrás
};

export default ProtectedRoute;