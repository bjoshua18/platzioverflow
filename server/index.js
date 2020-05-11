import Debug from 'debug'
import app from './app'
import { startConnection } from './database'

async function main() {
  const debug = new Debug('platzi-overflow:root')
  startConnection()
  await app.listen(app.get('port'), () => debug(`Server running at port ${app.get('port')}`))
}

main()
