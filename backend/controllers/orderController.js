import Order from '../models/Order.js';

// Para uso directo desde las rutas
export const createOrder = async (req, res) => {
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
};

// Para uso desde el chatbot
export const createOrderFromChatbot = async (orderData) => {
    try {
        if (!orderData.totalPedido || typeof orderData.totalPedido !== 'number') {
            throw new Error('El total del pedido es requerido y debe ser un número');
        }

        if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
            throw new Error('El pedido debe contener al menos un item');
        }

        const order = new Order({
            items: orderData.items,
            totalPedido: orderData.totalPedido,
            delivery: orderData.delivery || false,
            direccionEntrega: orderData.direccionEntrega || '',
            estado: 'pendiente'
        });

        const savedOrder = await order.save();

        return {
            success: true,
            orderId: savedOrder._id,
            message: `¡Pedido confirmado! 🎉\n\n` +
                `Número de pedido: #${savedOrder._id}\n` +
                `Total: $${orderData.totalPedido}\n` +
                `${orderData.delivery ? `🛵 Envío a: ${orderData.direccionEntrega}` : '🏪 Retiro en local'}\n\n` +
                `Te avisaremos cuando esté listo.`
        };
    } catch (error) {
        console.error('Error al crear pedido:', error);
        throw error;
    }
};

export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    createOrder,
    createOrderFromChatbot,
    getOrder
}; 