import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = 5000

app.listen(port, () => {
  console.log('App is now running at port ', port)
})
