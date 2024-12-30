import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// POST - Crear nueva orden
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        res.status(201).json({
            success: true,
            orderId: order._id,
            message: `¡Pedido confirmado! 🎉\n\nNúmero de pedido: #${order._id}\nTotal: $${order.totalPedido}\n🏪 Retiro en local\n\nTe avisaremos cuando esté listo.`
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET - Obtener orden por ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 