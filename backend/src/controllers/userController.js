const bcrypt = require('bcrypt');
const User = require('../models/User');

// Criar um novo usuário
const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create user' });
    }
};

// Obter todos os usuários
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Obter um usuário pelo ID
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Atualizar um usuário
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update user' });
    }
};

// Deletar um usuário
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {    
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
