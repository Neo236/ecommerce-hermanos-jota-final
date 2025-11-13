
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (res, userId) => {
    // Creamos el token (firmado con nuestro secreto)
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '30d' // Expira en 30 días
    });

    // Guardamos el token en una cookie HTTP-Only
    // Es más seguro que guardarlo en localStorage
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Usar https en producción
        sameSite: 'strict', // Previene ataques CSRF
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 días en milisegundos
    });
};

export default generateToken;