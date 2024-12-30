const errorHandler = (err, req, res, next) => {
    // Log error stack para debugging
    console.error(`[Error] ${new Date().toISOString()}:`, err.stack);

    // Manejar diferentes tipos de errores
    switch (err.name) {

        case 'ValidationError':
            return res.status(400).json({
                error: 'Error de validación',
                details: err.message,
                code: 'VALIDATION_ERROR'
            });

        case 'NotFoundError':
            return res.status(404).json({
                error: 'Recurso no encontrado',
                details: err.message,
                code: 'NOT_FOUND_ERROR'
            });

        default:
            // Error genérico del servidor
            return res.status(500).json({
                error: 'Error interno del servidor',
                details: process.env.NODE_ENV === 'production' ? 'Error interno' : err.message,
                code: 'INTERNAL_ERROR'
            });
    }
};

module.exports = errorHandler; 