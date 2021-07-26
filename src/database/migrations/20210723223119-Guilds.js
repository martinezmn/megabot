'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('guilds', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false
      },
      config: {
        type: Sequelize.STRING,
        allowNull: true
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
