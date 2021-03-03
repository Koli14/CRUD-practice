
export default async (app) => {
  app.all('*', (req, res) => res.status(200).send({
    message: 'Hello World!'
  }))
}
