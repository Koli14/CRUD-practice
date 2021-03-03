import model from '../models'

const { Partner, Settlement } = model

export default async (app) => {
  const partner = await Partner.findAll({
    include: [{
      model: Settlement
    }]
  })
  console.log(partner)

  const settlement = await Settlement.findAll({
  })
  console.log(settlement)
  app.all('*', (req, res) => res.status(200).send({
    message: 'Hello World!'
  }))
}
