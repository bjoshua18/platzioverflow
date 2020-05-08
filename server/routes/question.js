import { Router } from "express"

const router = Router()

const currentUser = {
  firstName: 'Byron',
  lastName: 'Bustamante',
  email: 'byron@email.com',
  password: 'byron'
}

function questionMiddleware(req, res, next) {
  const { id } = req.params
  req.question = questions.find(({_id}) => _id === +id)
  next()
}

function userMiddleware(req, res, next) {
  req.user = currentUser
  next()
}

const question = {
  _id: 1,
  title: '¿Cómo reutilizo un componente en Android?',
  description: 'Miren, esta es mi pregunta...',
  createdAt: new Date(),
  icon: 'devicon-android-plain',
  answers: [],
  user: currentUser
}

const questions = new Array(10).fill(question)

// /api/questions
router.get('/', (req, res) => res.status(200).json(questions))
// /api/questions/:id
router.get('/:id', questionMiddleware, (req, res) => {
  res.status(200).json(req.question)
})
// /api/questions
router.post('/', userMiddleware, (req, res) => {
  const question = {
    ...req.body,
    _id: +new Date(),
    user: req.user
  }
  questions.push(question)
  res.status(201).json(question)
})

router.post(
  '/:id/answers',
  questionMiddleware,
  userMiddleware,
  (req, res) => {
    const answer = req.body
    const q = req.question
    answer.createdAt = new Date()
    answer.user = req.user
    q.answers.push(answer)
    res.status(201).json(answer)
})

export default router
