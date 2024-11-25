const express = require('express');
const {
    createAttendanceRecord,
    getAttendanceRecords,
    updateAttendanceRecord,
    deleteAttendanceRecord,
    getAttendanceRecordsById
} = require('../controllers/attendanceController');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Rotas protegidas
router.post('/', authenticateUser,authorizeRole(['user', 'manager']), createAttendanceRecord);       // Criar um registro
router.get('/', authenticateUser,authorizeRole(['user', 'manager']), getAttendanceRecords); // Listar registros
router.get('/:id', authenticateUser,authorizeRole(['user', 'manager']), getAttendanceRecordsById); // Listar registros do usuário
router.put('/:id', authenticateUser,authorizeRole(['manager']), updateAttendanceRecord);    // Atualizar um registro
router.delete('/:id', authenticateUser,authorizeRole(['manager']), deleteAttendanceRecord); // Deletar um registro

module.exports = router;
