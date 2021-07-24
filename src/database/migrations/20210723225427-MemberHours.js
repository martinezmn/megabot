'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('member_hours', {
      member_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: { model: 'members', key: 'id' }
      },
      guild_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      online_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      week: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      week_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      month_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      year_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      last_week: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      last_month: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      last_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  }
};
