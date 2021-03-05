export default {
  up: async (queryInterface, Sequelize) => {
    const settlementIds = await queryInterface.sequelize.query(
      'SELECT id from Settlements;'
    )
    if (!settlementIds) {
      await queryInterface.bulkInsert('Settlements', [
        {
          name: 'Nagykanizsa',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Balatonalmádi',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Esztergom',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Szombathely',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Érd',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sokorópátka',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Győr',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {})
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Settlements', null, {})
  }
}
