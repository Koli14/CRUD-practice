import model from '../models'
import excel from 'exceljs'

const { Partner, Settlement, CompanyType } = model

export const download = (req, res) => {
  Partner.findAll({ include: [CompanyType, Settlement] }).then((objs) => {
    const partners = []

    objs.forEach((obj) => {
      partners.push({
        id: obj.id,
        name: obj.name,
        companyTypeId: obj.CompanyType?.name,
        taxNumber: obj.taxNumber,
        companyRegistrationNumber: obj.companyRegistrationNumber,
        settlementId: obj.Settlement.name,
        address: obj.address,
        phone: obj.phone,
        bankAccount: obj.bankAccount,
        comment: obj.comment
      })
    })

    const workbook = new excel.Workbook()
    const worksheet = workbook.addWorksheet('Partners')

    worksheet.properties.defaultColWidth = 30

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 5 },
      { header: 'Név', key: 'name' },
      { header: 'Cégforma', key: 'companyTypeId' },
      { header: 'Adószám', key: 'taxNumber' },
      { header: 'Cégjegyzékszám', key: 'companyRegistrationNumber' },
      { header: 'Település', key: 'settlementId' },
      { header: 'Cím', key: 'address' },
      { header: 'Telefonszám', key: 'phone' },
      { header: 'Bankszámlaszám', key: 'bankAccount' },
      { header: 'Megjegyzés', key: 'comment' }
    ]

    // Add Array Rows
    worksheet.addRows(partners)

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'partners.xlsx'
    )

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end()
    })
  })
}
