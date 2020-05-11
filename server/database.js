import Debug from 'debug'
import { connect } from 'mongoose'
import { mongoUrl } from './config'

export async function startConnection() {
  const debug = new Debug('platzi-overflow:db')
  await connect(mongoUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => debug('Database is connected'))
  .catch(() => debug('Error al conectarse'))
}
