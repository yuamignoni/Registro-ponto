const AttendanceRecord = require('../models/AttendanceRecord');
const User = require('../models/User');

// Criar um registro de ponto
const createAttendanceRecord = async (req, res) => {
        try {
            const { id: userId } = req.user; // Obtém o ID do usuário autenticado a partir do token JWT

            // Verifica se o usuário existe
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            // Busca o último ponto registrado do usuário
            const lastRecord = await AttendanceRecord.findOne({
                where: { userId },
                order: [['createdAt', 'DESC']],
            });

            // Determina o tipo de ponto (entrada ou saída)
            const isCheckIn = !lastRecord || lastRecord.check_out !== null;

            if (isCheckIn) {
                // Cria um novo ponto de entrada
                const newRecord = await AttendanceRecord.create({
                    userId,
                    check_in: new Date(),
                });
                return res.status(201).json({
                    message: 'Ponto de entrada registrado com sucesso.',
                    record: newRecord,
                });
            } else {
                // Atualiza o último ponto com o horário de saída
                lastRecord.check_out = new Date();
                await lastRecord.save();
                return res.status(200).json({
                    message: 'Ponto de saída registrado com sucesso.',
                    record: lastRecord,
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao registrar o ponto.' });
        }
};

// Obter todos os registros de ponto do usuário logado
const getAttendanceRecords = async (req, res) => {
    try {
        const records = await AttendanceRecord.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']],
        });
        return res.json(records);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
};
// Obter todos os registros de ponto do usuário do id
const getAttendanceRecordsById = async (req, res) => {
    try {
        const { id } = req.params;
        const records = await AttendanceRecord.findAll({
            where: { userId: id },
            order: [['createdAt', 'DESC']],
        });
        return res.json(records);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
};
// Atualizar um registro de ponto
const updateAttendanceRecord = async (req, res) => {
    const { id } = req.params;
    const { check_in, check_out } = req.body;

    try {
        const record = await AttendanceRecord.findOne({
            where: { id, userId: req.user.id },
        });

        if (!record) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        record.check_in = check_in || record.check_in;
        record.check_out = check_out || record.check_out;
        await record.save();

        return res.json(record);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update attendance record' });
    }
};

// Deletar um registro de ponto
const deleteAttendanceRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const record = await AttendanceRecord.findOne({
            where: { id, userId: req.user.id },
        });

        if (!record) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        await record.destroy();
        return res.json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete attendance record' });
    }
};

module.exports = {
    createAttendanceRecord,
    getAttendanceRecords,
    updateAttendanceRecord,
    deleteAttendanceRecord,
    getAttendanceRecordsById
};
