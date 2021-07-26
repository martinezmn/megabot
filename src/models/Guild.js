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

        const config = JSON.parse(guild?.dataValues?.config);

        return {
            prefix: config?.prefix ?? process.env.PREFIX,
            timezone: config?.timezone ?? process.env.TIMEZONE,
            card_color: config?.card_color ?? process.env.CARD_COLOR,
            admin_role: config?.admin_role ?? process.env.ADMIN_ROLE
        };
    }

    static async setConfig(guild_id, attribute, value) {
        const guild = await this.findByPk(guild_id);

        let config = JSON.parse(guild?.dataValues?.config);
        config[attribute] = value;
        config = JSON.stringify(config);

        return await guild.update({ config });
    }
}

module.exports = guild;
