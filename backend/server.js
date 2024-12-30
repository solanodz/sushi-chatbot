import { app, connectDB } from './app.js';
import dotenv from 'dotenv';

dotenv.config();

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

export { server };
