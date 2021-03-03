export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Settlements', [
      {
        name: 'Nagykanizsa',
        zip: 8800,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Balatonalmádi',
        zip: 8220,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Esztergom',
        zip: 2500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Szombathely',
        zip: 9700,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Érd',
        zip: 2030,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sokorópátka',
        zip: 9112,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Győr',
        zip: 9022,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Settlements', null, {})
  }
}
