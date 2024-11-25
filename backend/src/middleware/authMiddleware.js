const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Certifique-se de ter o modelo User definido

// Middleware para autenticar o usuário
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Exemplo: "Bearer token"
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido.' });
        }

        // Verifica o token e obtém os dados do usuário
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        req.user = user // Insere o ID do usuário no req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Falha na autenticação.', error: error.message });
    }
};

// Middleware para autorizar por papel (role)
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acesso negado.' });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRole };
