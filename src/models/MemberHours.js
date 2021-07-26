const { Model, DataTypes, Op } = require('sequelize');
const dateHelper = require('../helpers/date.helper');
const Member = require('../models/Member');

class memberHours extends Model {
    static init(sequelize) {
        super.init({
            member_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                references: { model: 'members', key: 'id' }
            },
            guild_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                references: { model: 'guilds', key: 'id' }
            },
            online_at: {
                type: DataTypes.DATE,
                allowNull: true
            },
            week: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            week_total: {
                type: DataTypes.INTEGER
            },
            month: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            month_total: {
                type: DataTypes.INTEGER
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            year_total: {
                type: DataTypes.INTEGER
            },
            last_week: {
                type: DataTypes.INTEGER
            },
            last_month: {
                type: DataTypes.INTEGER
            },
            last_year: {
                type: DataTypes.INTEGER
            },
        }, {
            updatedAt: 'updated_at',
            createdAt: 'created_at',
            sequelize
        });
    }

    static async setOnline(member_id, guild_id) {
        const memberHours = await this.findOne({
            where: {
                member_id,
                guild_id
            }
        });

        if (memberHours?.dataValues?.online_at) {
            return false;
        }

        await Member.create({ id: member_id }, { ignoreDuplicates: true });

        const date = await dateHelper.date();

        const args = {
            member_id: member_id,
            guild_id: guild_id,
            online_at: date.now,
            week: date.week,
            month: date.month,
            year: date.year
        };

        if (memberHours) {
            return await this.update(args, {
                where: {
                    member_id,
                    guild_id
                }
            })
        }

        return await this.create(args);
    }

    static async setOffline(member_id, guild_id) {
        const memberHours = await this.findOne({ where: { member_id, guild_id } });

        const dataValues = memberHours.dataValues;

        if (!memberHours.online_at) {
            return false;
        }

        const date = await dateHelper.date();

        const seconds = await dateHelper.getSeconds(dataValues.online_at, date.now);

        if (dataValues.week == date.week) {
            dataValues.week_total += seconds;
        } else {
            dataValues.last_week = dataValues.week_total;
            dataValues.week = date.week;
            dataValues.week_total = seconds;
        }

        if (dataValues.month == date.month) {
            dataValues.month_total += seconds;
        } else {
            dataValues.last_month = dataValues.month_total;
            dataValues.month = date.month;
            dataValues.month_total = seconds;
        }

        if (dataValues.year == date.year) {
            dataValues.year_total += seconds;
        } else {
            dataValues.last_year = dataValues.year_total;
            dataValues.year = date.year;
            dataValues.year_total = seconds;
        }

        dataValues.online_at = null;

        return await this.update(dataValues, {
            where: {
                member_id,
                guild_id
            }
        });
    }
}

module.exports = memberHours;
