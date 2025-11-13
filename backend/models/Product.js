import mongoose from 'mongoose';;
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    // 'specs' es un objeto con claves variables (medidas, materiales, etc.).
    // 'Object' o 'Schema.Types.Mixed' le da esa flexibilidad.
    specs: {
        type: Object, 
        required: true
    }
}, {
    timestamps: true // Esto añade 'createdAt' y 'updatedAt' automáticamente
});

// --- IMPORTANTE: Virtual 'id' ---
// MongoDB usa '_id' por defecto.
// Esta configuración crea un campo virtual 'id' que es una copia de '_id'.
// Así nos aseguramos la compatibilidad con el código del frontend.
productSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v; 
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;