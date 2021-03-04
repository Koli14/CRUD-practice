import model from '../models'

const { Partner, Settlement, CompanyType } = model

export default async (app) => {
  app.all('*', (req, res) => res.status(200).send({
    message: 'Hello World!'
  }))
}
