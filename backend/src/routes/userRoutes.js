const express = require('express');
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Rotas para CRUD de usuários
router.post('/', authenticateUser, authorizeRole(['manager']), createUser);         // Criar usuário
router.get('/', authenticateUser, authorizeRole(['manager']), getUsers);           // Obter todos os usuários
router.get('/:id', authenticateUser, authorizeRole(['manager']), getUserById);     // Obter usuário pelo ID
router.put('/:id', authenticateUser, authorizeRole(['manager']), updateUser);      // Atualizar usuário
router.delete('/:id', authenticateUser, authorizeRole(['manager']), deleteUser);   // Deletar usuário

module.exports = router;
