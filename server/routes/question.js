import { Router } from "express"

const router = Router()

const question = {
  _id: 1,
  title: '¿Cómo reutilizo un componente en Android?',
  description: 'Miren, esta es mi pregunta...',
  createdAt: new Date(),
  icon: 'devicon-android-plain',
  answers: [],
  user: {
    firstName: 'Byron',
    lastName: 'Bustamante',
    email: 'byron@email.com',
    password: 'byron'
  }
}

const questions = new Array(10).fill(question)

// /api/questions
router.get('/', (req, res) => res.status(200).json(questions))
// /api/questions/:id
router.get('/:id', (req, res) => {
  const { id } = req.params
  const q = questions.find(({_id}) => _id === +id)
  res.status(200).json(q)
})
// /api/questions
router.post('/', (req, res) => {
  const question = {
    ...req.body,
    _id: +new Date(),
    user: {
      email: 'byron@email.com',
      password: '1234',
      firstName: 'Byron',
      lastName: 'Bustamante'
    }
  }
  questions.push(question)
  res.status(201).json(question)
})

export default router
