import reservationController from './reservationController.js';
import { createOrderFromChatbot } from './orderController.js';
import restaurantInfoController from './restaurantInfoController.js';
import { GENERIC_RESPONSES } from '../constants/responses.js';

const DEFAULT_OPTIONS = ["Ver menú", "Tomar tu pedido", "Hacer una reserva", "Información del local"];

const chatbotController = {
    processMessage: async (req, res) => {
        const { message, reservationData, orderItems, totalPedido, delivery, direccionEntrega } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({
                error: 'El mensaje no puede estar vacío'
            });
        }

        const lowerMessage = message.toLowerCase().trim();

        try {
            // Manejar reservas
            if (lowerMessage === 'hacer una reserva' ||
                lowerMessage === 'reservar' ||
                lowerMessage === 'confirmar reserva') {
                if (reservationData) {
                    try {
                        // Usar el controlador de reservas existente
                        const result = await reservationController.createReservation(reservationData);
                        return res.json({
                            response: result.message,
                            options: DEFAULT_OPTIONS
                        });
                    } catch (error) {
                        return res.json({
                            response: "Lo siento, hubo un error al procesar tu reserva. Por favor, intenta nuevamente.",
                            error: true,
                            options: DEFAULT_OPTIONS
                        });
                    }
                } else {
                    return res.json({
                        response: "¡Por supuesto! Por favor, completa los siguientes datos para tu reserva:",
                        showReservationForm: true,
                        options: DEFAULT_OPTIONS
                    });
                }
            }

            // Manejar información del local
            if (lowerMessage === 'información del local') {
                const info = restaurantInfoController.getLocation();
                const schedule = restaurantInfoController.getSchedule();
                const payments = restaurantInfoController.getPaymentMethods();

                return res.json({
                    response: `${info.response}\n\n${schedule.response}\n\n${payments.response}`,
                    options: DEFAULT_OPTIONS
                });
            }

            // Manejar pedidos
            if (lowerMessage === 'tomar tu pedido' || lowerMessage === 'hacer pedido') {
                return res.json({
                    response: "¡Por supuesto! Aquí tienes nuestro menú para que puedas hacer tu pedido.",
                    showMenu: true,
                    options: DEFAULT_OPTIONS
                });
            }

            // Manejar consultas específicas
            if (lowerMessage.includes('pago') || lowerMessage.includes('pagar')) {
                const response = restaurantInfoController.getPaymentMethods();
                return res.json({
                    ...response,
                    options: DEFAULT_OPTIONS
                });
            }

            if (lowerMessage.includes('horario')) {
                const response = restaurantInfoController.getSchedule();
                return res.json({
                    ...response,
                    options: DEFAULT_OPTIONS
                });
            }

            if (lowerMessage.includes('ubicacion') || lowerMessage.includes('dirección')) {
                const response = restaurantInfoController.getLocation();
                return res.json({
                    ...response,
                    options: DEFAULT_OPTIONS
                });
            }

            if (lowerMessage.includes('delivery') || lowerMessage.includes('envío')) {
                const response = restaurantInfoController.getDeliveryInfo();
                return res.json({
                    ...response,
                    options: [...response.options, ...DEFAULT_OPTIONS]
                });
            }

            // Manejar saludos
            if (lowerMessage.includes('hola') || lowerMessage.includes('buenos')) {
                const randomGreeting = GENERIC_RESPONSES.greeting[
                    Math.floor(Math.random() * GENERIC_RESPONSES.greeting.length)
                ];
                return res.json({
                    response: randomGreeting,
                    options: DEFAULT_OPTIONS
                });
            }

            // Respuesta por defecto
            return res.json({
                response: GENERIC_RESPONSES.unknown[
                    Math.floor(Math.random() * GENERIC_RESPONSES.unknown.length)
                ],
                options: DEFAULT_OPTIONS
            });

        } catch (error) {
            console.error('Error en chatbot:', error);
            return res.status(500).json({
                response: "Lo siento, hubo un error al procesar tu solicitud.",
                error: true,
                options: DEFAULT_OPTIONS
            });
        }
    }
};

export default chatbotController;