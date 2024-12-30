import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items: [{
        nombre: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        }
    }],
    totalPedido: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

export default mongoose.model('Order', orderSchema); 