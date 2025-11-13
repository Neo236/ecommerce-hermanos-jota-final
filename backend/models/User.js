// /backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importamos bcrypt

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // No puede haber dos usuarios con el mismo email
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: { // Para futuras rutas de administrador
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true // Añade createdAt y updatedAt
});

// --- MÉTODO PARA COMPARAR CONTRASEÑAS ---
// Añadimos un método personalizado a nuestro modelo
// Esto nos permitirá llamar a 'user.matchPassword(passwordIngresada)'
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// --- MIDDLEWARE DE PRE-GUARDADO (PRE-SAVE) ---
// Esto se ejecutará AUTOMÁTICAMENTE antes de que un nuevo usuario se guarde
userSchema.pre('save', async function(next) {
    // Solo hasheamos la contraseña si es nueva o ha sido modificada
    if (!this.isModified('password')) {
        next();
    }

    // Generamos el 'salt' y hasheamos la contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;