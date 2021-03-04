import express from 'express'
import route from './src/routes'
import cors from 'cors'
import bodyParser from 'body-parser'
import db from './src/models'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

db.sequelize.sync()

route(app)

const port = 5000

app.listen(port, () => {
  console.log('App is now running at port ', port)
})
