import crud, { sequelizeCrud } from 'express-sequelize-crud'

import model from '../models'
import { download } from '../controllers/partnerController'

const { Partner, Settlement, CompanyType } = model

export default async (app) => {
  app.use(crud('/api/admin/partners', sequelizeCrud(Partner)))
  app.use(crud('/api/admin/settlements', sequelizeCrud(Settlement)))
  app.use(crud('/api/admin/companyTypes', sequelizeCrud(CompanyType)))

  app.get('/api/admin/download', download)

  app.all('*', (req, res) => res.status(200).send({
    message: 'Hello World!'
  }))
}
