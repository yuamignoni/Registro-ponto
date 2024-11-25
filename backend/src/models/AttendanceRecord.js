const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class AttendanceRecord extends Model {}

AttendanceRecord.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        check_in: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        check_out: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: 'AttendanceRecord',
        tableName: 'AttendanceRecords',
    }
);

module.exports = AttendanceRecord;
