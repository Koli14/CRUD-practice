export default {
  up: async (queryInterface, Sequelize) => {
    const [companyTypes] = await queryInterface.sequelize.query(
      'SELECT id from CompanyTypes;'
    )
    const [settlements] = await queryInterface.sequelize.query(
      'SELECT id from Settlements;'
    )

    await queryInterface.bulkInsert('Partners', [
      {
        name: 'Runios IT Kft.',
        companyTypeId: companyTypes[Math.floor(Math.random() * companyTypes.length)].id,
        taxNumber: '68861371-4-05',
        companyRegistrationNumber: '09-34-424117',
        settlementId: settlements[Math.floor(Math.random() * settlements.length)].id,
        address: 'Árpád fejedelem útja 35.',
        phone: '+36-77-864-7749',
        bankAccount: '1318643531600939',
        comment: 'Voluptate ipsum proident.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fornite Inc.',
        companyTypeId: companyTypes[Math.floor(Math.random() * companyTypes.length)].id,
        taxNumber: '80698715-3-51',
        companyRegistrationNumber: '02-12-296977',
        settlementId: settlements[Math.floor(Math.random() * settlements.length)].id,
        address: 'Szilágyi Erzsébet fasor 76.',
        phone: '+36-36-458-4611',
        bankAccount: '47891690 2270477054746004',
        comment: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Csirkekopasztó társaság',
        companyTypeId: companyTypes[Math.floor(Math.random() * companyTypes.length)].id,
        taxNumber: '31170036-5-19',
        companyRegistrationNumber: '10-04-431588',
        settlementId: settlements[Math.floor(Math.random() * settlements.length)].id,
        address: 'Apáczai Csere János u.',
        phone: '+36-43-924-5961',
        bankAccount: '84469727-7193767500647767',
        comment: 'Anim sint nostrud quis eiusmod.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Szorgalmas munkaközösség',
        companyTypeId: companyTypes[Math.floor(Math.random() * companyTypes.length)].id,
        taxNumber: '16762253-2-51',
        companyRegistrationNumber: '67-86-156145',
        settlementId: settlements[Math.floor(Math.random() * settlements.length)].id,
        address: 'Nánási út 42.',
        phone: '+36-41-113-6075',
        bankAccount: '1002201294013629',
        comment: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zsonglőr egyesület',
        companyTypeId: companyTypes[Math.floor(Math.random() * companyTypes.length)].id,
        taxNumber: '70204064-4-51',
        companyRegistrationNumber: '81-32-469157',
        settlementId: settlements[Math.floor(Math.random() * settlements.length)].id,
        address: 'Izabella u. 77.',
        phone: '+36-04-906-4144',
        bankAccount: '44915385 3722266432684546',
        comment: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pirkadat Zrt.',
        companyTypeId: companyTypes[Math.floor(Math.random() * companyTypes.length)].id,
        taxNumber: '84100787-1-26',
        companyRegistrationNumber: '86-11-009867',
        settlementId: settlements[Math.floor(Math.random() * settlements.length)].id,
        address: 'Izabella u. 84.',
        phone: '+36-35-387-3548',
        bankAccount: '8041817966194108',
        comment: 'Non mollit sunt qui amet enim.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Palermo',
        companyTypeId: companyTypes[Math.floor(Math.random() * companyTypes.length)].id,
        taxNumber: '62859194-2-26',
        companyRegistrationNumber: '90-36-937545',
        settlementId: settlements[Math.floor(Math.random() * settlements.length)].id,
        address: 'Erzsébet krt. 39.',
        phone: '+36-34-626-7337',
        bankAccount: '5921484785233055-64799375',
        comment: 'Voluptate eu irure dolore esse.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Partners', null, {})
  }
}
