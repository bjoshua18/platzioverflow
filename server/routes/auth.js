import { Router } from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret } from '../config'
import { User } from '../models'
import { hashSync as hash, compareSync as comparePasswords } from 'bcrypt'

const router = Router()
const debug = new Debug('platzi-overflow:auth')

const createToken = user => jwt.sign({ user }, secret, { expiresIn: 86400 })

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({email})

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

router.post('/signup', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body
  const u = new User({
    firstName,
    lastName,
    email,
    password: hash(password, 10)
  })
  const user = await u.save()
  debug(`Creating new user: ${u}`)
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
