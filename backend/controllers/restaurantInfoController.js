const restaurantInfoController = {
    getPaymentMethods: () => ({
        response: "💳 Medios de pago aceptados:\n\n" +
            "• Efectivo\n" +
            "• Tarjetas de débito\n" +
            "• Tarjetas de crédito (Visa, Mastercard, American Express)\n" +
            "• Mercado Pago\n",
    }),

    getSchedule: () => ({
        response: "🕒 Nuestros horarios:\n\n" +
            "Lunes a Jueves:\n" +
            "• Almuerzo: 12:00 - 15:00\n" +
            "• Cena: 19:00 - 23:00\n\n" +
            "Viernes y Sábados:\n" +
            "• Almuerzo: 12:00 - 15:00\n" +
            "• Cena: 19:00 - 00:00\n\n" +
            "Domingos:\n" +
            "• Almuerzo: 12:00 - 15:30\n" +
            "• Cena: 19:00 - 22:30\n",
    }),

    getLocation: () => ({
        response: "📍 Nuestra ubicación:\n\n" +
            "Av. Ejemplo 1234\n" +
            "Ciudad Ejemplo, CP 1234\n\n" +
            "🚗 Estacionamiento disponible\n" +
            "🚌 Colectivos: 123, 456, 789\n" +
            "🚇 Subte: Línea A - Estación Ejemplo\n",
    }),

    getDeliveryInfo: () => ({
        response: "🛵 Información de delivery:\n\n" +
            "• Pedido mínimo: $3000\n" +
            "• Radio de entrega: 5km\n" +
            "• Tiempo estimado: 30-45 minutos\n" +
            "• Costo de envío según zona\n",
        options: ["Ver zonas de entrega", "Hacer pedido"]
    })
};

export default restaurantInfoController; 