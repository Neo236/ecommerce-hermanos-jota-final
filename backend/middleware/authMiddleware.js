// /backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 1. Middleware "protect": Verifica que el usuario esté logueado
const protect = async (req, res, next) => {
    let token;

    // Leemos el token de la cookie 'jwt' que creamos en generateToken.js
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verificamos el token con nuestro secreto
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscamos al usuario en la BD (sin el password) y lo añadimos a 'req'
            // para que las siguientes rutas puedan usarlo
            req.user = await User.findById(decoded.userId).select('-password');

            next(); // El usuario está logueado, continuar
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    } else {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

// 2. Middleware "admin": Verifica que el usuario sea Admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Es admin, continuar
    } else {
        res.status(401).json({ message: 'No autorizado como administrador' });
    }
};

export { protect, admin };