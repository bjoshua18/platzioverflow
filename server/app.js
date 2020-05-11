import express from 'express'
import bodyParser from 'body-parser'
import { question, auth } from './routes'

const app = express()

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  next()
})

// Routes
app.use('/api/questions', question)
app.use('/api/auth', auth)

export default app
