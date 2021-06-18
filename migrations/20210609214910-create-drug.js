'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('drugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      why: {
        type: Sequelize.TEXT
      },
      how: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      hiv: {
        type: Sequelize.TEXT
      },
      hivurl: {
        type: Sequelize.STRING
      },
      lactation: {
        type: Sequelize.TEXT
      },
      lactationurl: {
        type: Sequelize.STRING
      },
      liver: {
        type: Sequelize.TEXT
      },
      liverurl: {
        type: Sequelize.STRING
      },
      packager: {
        type: Sequelize.TEXT
      },
      packagerurl: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      categorydrugurl: {
        type: Sequelize.STRING
      },
      categorydrugdesc: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('drugs');
  }
};