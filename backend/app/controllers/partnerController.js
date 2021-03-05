import model from '../models'
import excel from 'exceljs'

const { Partner } = model

const download = (req, res) => {
  Partner.findAll().then((objs) => {
    const partners = []

    objs.forEach((obj) => {
      partners.push({
        id: obj.id,
        name: obj.name,
        companyTypeId: obj.companyTypeId,
        taxNumber: obj.taxNumber,
        companyRegistrationNumber: obj.companyRegistrationNumber,
        settlementId: obj.settlementId,
        address: obj.address,
        phone: obj.phone,
        bankAccount: obj.bankAccount,
        comment: obj.comment
      })
    })

    const workbook = new excel.Workbook()
    const worksheet = workbook.addWorksheet('Tutorials')

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 5 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'CompanyTypeId', key: 'companyTypeId', width: 25 },
      { header: 'TaxNumber', key: 'taxNumber', width: 10 },
      { header: 'CompanyRegistrationNumber', key: 'companyRegistrationNumber', width: 10 },
      { header: 'SettlementId', key: 'settlementId', width: 10 },
      { header: 'Address', key: 'address', width: 10 },
      { header: 'Phone', key: 'phone', width: 10 },
      { header: 'BankAccount', key: 'bankAccount', width: 10 },
      { header: 'Comment', key: 'comment', width: 10 }
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

export default {
  download
}
