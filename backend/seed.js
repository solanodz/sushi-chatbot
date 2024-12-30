import mongoose from 'mongoose';
import Menu from './models/Menu.js';
import dotenv from 'dotenv';

dotenv.config();

const menuItems = [
    // Rolls Clásicos
    {
        name: "California Roll",
        description: "Roll con aguacate, pepino y cangrejo",
        price: 12.99,
        category: "Rolls"
    },
    {
        name: "Philadelphia Roll",
        description: "Roll con salmón, queso crema y pepino",
        price: 13.99,
        category: "Rolls"
    },
    {
        name: "Spicy Tuna Roll",
        description: "Roll con atún picante y pepino",
        price: 14.99,
        category: "Rolls"
    },

    // Rolls Especiales
    {
        name: "Dragon Roll",
        description: "Roll tempura con anguila y aguacate por fuera",
        price: 16.99,
        category: "Rolls Especiales"
    },
    {
        name: "Rainbow Roll",
        description: "California roll cubierto con variedad de pescados",
        price: 17.99,
        category: "Rolls Especiales"
    },
    {
        name: "Volcano Roll",
        description: "Roll tempura con topping de mariscos gratinados",
        price: 18.99,
        category: "Rolls Especiales"
    },

    // Bebidas
    {
        name: "Agua Mineral",
        description: "Agua mineral 500ml",
        price: 2.50,
        category: "Bebidas"
    },
    {
        name: "Agua con Gas",
        description: "Agua carbonatada 500ml",
        price: 2.50,
        category: "Bebidas"
    },
    {
        name: "Coca Cola",
        description: "Coca Cola regular 350ml",
        price: 3.50,
        category: "Bebidas"
    },
    {
        name: "Coca Cola Zero",
        description: "Coca Cola sin azúcar 350ml",
        price: 3.50,
        category: "Bebidas"
    },
    {
        name: "Sprite",
        description: "Sprite regular 350ml",
        price: 3.50,
        category: "Bebidas"
    },
    {
        name: "Agua Saborizada Limón",
        description: "Agua saborizada sin gas 500ml",
        price: 3.00,
        category: "Bebidas"
    },
    {
        name: "Agua Saborizada Pomelo",
        description: "Agua saborizada sin gas 500ml",
        price: 3.00,
        category: "Bebidas"
    },
    {
        name: "Limonada",
        description: "Limonada natural 500ml",
        price: 4.00,
        category: "Bebidas"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB');

        await Menu.deleteMany({}); // Limpia la colección existente
        await Menu.insertMany(menuItems);

        console.log('Base de datos poblada con éxito');
        process.exit(0);
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
};

seedDB(); 