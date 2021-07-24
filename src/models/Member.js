const { Model, DataTypes, Sequelize } = require('sequelize');

class member extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true
            }
        }, {
            updatedAt: 'updated_at',
            createdAt: 'created_at',
            sequelize
        });
    }
}

module.exports = member;
