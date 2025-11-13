
import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/authMiddleware.js'; // 1. Importamos nuestro "guardia"

const router = express.Router();

// @desc    Crear un nuevo pedido
// @route   POST /api/orders
// @access  Privado (solo usuarios logueados)
router.post('/', protect, async (req, res) => {
    // 2. 'protect' nos da acceso a 'req.user' (el usuario logueado)
    const { orderItems, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No hay productos en el pedido' });
        return;
    }

    try {
        const order = new Order({
            orderItems: orderItems.map(item => ({
                ...item,
                product: item.id // Mapeamos 'id' a 'product'
            })),
            user: req.user._id, // Asociamos el pedido al usuario logueado
            totalPrice: totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;