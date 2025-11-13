
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    // Usamos 'ref' para crear una relación con nuestro modelo 'User'
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [ // Un arreglo de los productos comprados
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            // 'product' es una referencia al producto original
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    // Guardaremos el precio total para referencia futura
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    }
}, {
    timestamps: true // Añade createdAt y updatedAt
});

const Order = mongoose.model('Order', orderSchema);
export default Order;