import Menu from '../models/Menu.js';

const menuController = {
    getMenu: async (req, res) => {
        try {
            const menuItems = await Menu.find({}).sort({ categoria: 1 });
            res.json(menuItems);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                message: 'Error al cargar el menú',
                error: error.message
            });
        }
    }
};

export default menuController; 