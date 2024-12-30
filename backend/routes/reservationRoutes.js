import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const reservation = new Reservation({
        date: req.body.date,
        time: req.body.time,
        people: req.body.people,
        name: req.body.name,
        phone: req.body.phone,
        status: 'PENDING'
    });

    try {
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 