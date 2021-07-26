const { Model, DataTypes, Sequelize } = require('sequelize');

class guild extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            config: {
                type: DataTypes.STRING,
                allowNull: true
            },
        }, {
            updatedAt: 'updated_at',
            createdAt: 'created_at',
            sequelize
        });
    }

    static async getConfig(guild_id) {
        const guild = await this.findByPk(guild_id);
      
        return {
            prefix: guild?.dataValues?.config.prefix ?? process.env.PREFIX,
            timezone: guild?.dataValues?.config.timezone ?? process.env.TIMEZONE,
            card_color: guild?.dataValues?.config.card_color ?? process.env.CARD_COLOR,
            admin_role: guild?.dataValues?.config.admin_role ?? process.env.ADMIN_ROLE
        };
    }
}

module.exports = guild;
