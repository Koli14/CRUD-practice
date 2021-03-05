export default {
  up: async (queryInterface, Sequelize) => {
    const [companyTypeIds] = await queryInterface.sequelize.query(
      'SELECT id from CompanyTypes;'
    )
    if (!companyTypeIds.length) {
      await queryInterface.bulkInsert('CompanyTypes', [
        {
          name: 'Vállalat',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Szövetkezet',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Közkereseti társaság',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Gazdasági munkaközösség',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Betéti társaság',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Egyesülés',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Európai szövetkezet',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {})
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CompanyTypes', null, {})
  }
}
