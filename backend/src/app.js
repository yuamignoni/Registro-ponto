require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const userRoutes = require('./routes/userRoutes');
const morgan = require('morgan');
const cors = require('cors')

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())
// Rotas
app.use('/auth', authRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/users', userRoutes);
// Inicialização do banco de dados
(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Database connected and synced!');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();

// Start do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
