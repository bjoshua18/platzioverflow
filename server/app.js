import express from 'express'
import bodyParser from 'body-parser'
import { question, auth } from './routes'
import { port } from './config'
import path from 'path'

const app = express()

// Settings
app.set('port', port)

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  // Configurar cabeceras y cors
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next()
  })
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'dist/public')))
}

// Routes
app.use('/api/questions', question)
app.use('/api/auth', auth)

export default app
