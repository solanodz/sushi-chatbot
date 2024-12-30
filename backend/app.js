import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import menuRoutes from './routes/menuRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas con prefijos más específicos
app.use('/api/menu', menuRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);

// Modificar la conexión a MongoDB para que sea más testeable
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.error('Error conectando a MongoDB:', err);
    }
};

export { app, connectDB }; 