import express from 'express'
import route from './app/routes'
import cors from 'cors'
import db from './app/models'

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

db.sequelize.sync()

route(app)

const port = 5000

app.listen(port, () => {
  console.log('App is now running at port ', port)
})
