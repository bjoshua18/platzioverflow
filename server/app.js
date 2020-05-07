import express from 'express'
import {
  question
} from './routes'

const app = express()

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  next()
})

app.use('/api/questions', question)

export default app
