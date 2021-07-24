'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('members', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false
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
