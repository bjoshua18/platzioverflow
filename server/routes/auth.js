import { Router } from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'

const router = Router()
const debug =new Debug('platzi-overflow:auth')

const secret = 'clavesecreta'

const users = [
  {
    _id: '123',
    firstName: 'Byron',
    lastName: 'Bustamante',
    email: 'byron@email.com',
    password: 'byron'
  }
]

const findUserByEmail = email => users.find(user => user.email === email)

const comparePasswords = (providedPassword, userPassword) => providedPassword === userPassword

const createToken = user => jwt.sign({ user }, secret, { expiresIn: 86400 })

router.post('/signin', (req, res, next) => {
  const { email, password } = req.body
  const user = findUserByEmail(email)

  if (!user) {
    debug(`User with emmail ${email} not found`)
    return handleLoginFailed(res)
  }

  if(!comparePasswords(password, user.password)) {
    debug(`Password do not match`)
    return handleLoginFailed(res, 'El correo o la contraseña son iconrrectos')
  }

  const token = createToken(user)
  res.status(200).json({
    message: 'Login succeded',
    token,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  })
})

router.post('/signup', (req, res, next) => {
  const user = {
    _id: +new Date(),
    ...req.body
  }
  debug(`Creating new user: ${user}`)
  users.push(user)
  const token = createToken(user)
  res.status(201).json({
    message: 'User created',
    token,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  })
})

function handleLoginFailed(res, message) {
  return res.status(401).json({
    message: 'Login failed',
    error: message || 'Email and password don\'t match'
  })
}

export default router
