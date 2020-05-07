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
router.get('/:id', (req, res) => res.status(200).json(question))

export default router
