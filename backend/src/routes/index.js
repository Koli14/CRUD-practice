import crud, { sequelizeCrud } from 'express-sequelize-crud'
import model from '../models'

const { Partner, Settlement, CompanyType } = model

export default async (app) => {
  app.use(crud('/admin/partners', sequelizeCrud(Partner)))
  app.use(crud('/admin/settlements', sequelizeCrud(Settlement)))
  app.use(crud('/admin/companyTypes', sequelizeCrud(CompanyType)))

  app.all('*', (req, res) => res.status(200).send({
    message: 'Hello World!'
  }))
}
