export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Partners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      companyTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'CompanyTypes'
          },
          key: 'id'
        }
      },
      taxNumber: {
        type: Sequelize.STRING
        // is: /^(\d{7})(\d)-([1-5])-(0[2-9]|[13][0-9]|2[02-9]|4[0-4]|51)$/
      },
      companyRegistrationNumber: {
        type: Sequelize.STRING
        // is: /^(\d{2})-(\d{2})-(\d{6})$/
      },
      settlementId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Settlements'
          },
          key: 'id'
        },
        allowNull: false
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
        // is: /^[+\d]?(?:[\d-.\s()]*)$/i
      },
      bankAccount: {
        type: Sequelize.STRING
        // is: /^[0-9]{8}([ -]?[0-9]{8}){1,2}$/
      },
      comment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Partners')
  }
}
