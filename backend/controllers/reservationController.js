import Reservation from '../models/Reservation.js';

const reservationController = {
    createReservation: async (reservationData) => {
        try {
            const newReservation = new Reservation({
                name: reservationData.name,
                people: reservationData.partySize,
                date: reservationData.date,
                time: reservationData.time,
                phone: reservationData.phone,
                email: reservationData.email,
                notes: reservationData.notes,
                status: 'CONFIRMED'
            });

            const savedReservation = await newReservation.save();

            // Formatear la fecha
            const [year, month, day] = reservationData.date.split('-');
            const formattedDate = `${day}/${month}/${year}`;

            const confirmationMessage = `¡Reserva confirmada! 🎉\n\n` +
                `Detalles de tu reserva:\n` +
                `📅 Fecha: ${formattedDate}\n` +
                `🕒 Hora: ${reservationData.time}\n` +
                `👥 Personas: ${reservationData.partySize}\n` +
                `👤 Nombre: ${reservationData.name}\n` +
                `📞 Teléfono: ${reservationData.phone}\n` +
                `${reservationData.email ? `📧 Email: ${reservationData.email}\n` : ''}` +
                `${reservationData.notes ? `📝 Notas: ${reservationData.notes}\n` : ''}\n` +
                `Estado: ✅ Confirmada\n\n` +
                `¡Te esperamos en nuestro restaurante! 🙏\n\n` +
                `Recuerda que al llegar debes:\n` +
                `1. Dirigirte a la recepción\n` +
                `2. Mencionar que tienes una reserva a nombre de ${reservationData.name}\n` +
                `3. Nuestro personal te guiará a tu mesa\n\n` +
                `Si necesitas hacer algún cambio en tu reserva o tienes alguna pregunta, contactanos al 012 345 6789\n\n` +
                `¡Que tengas un excelente día! 👋`;

            return {
                success: true,
                reservationId: savedReservation._id,
                message: confirmationMessage
            };
        } catch (error) {
            console.error('Error al crear reserva:', error);
            throw error;
        }
    }
};

export default reservationController; 