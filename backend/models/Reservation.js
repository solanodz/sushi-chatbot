import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
        default: 'PENDING'
    }
}, {
    timestamps: true
});

export default mongoose.model('Reservation', reservationSchema); 