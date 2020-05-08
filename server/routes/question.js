import { Router } from "express"
import {
  required,
  questionMiddleware,
  questionsMiddleware,
  questions
} from '../middleware'

const router = Router()

// /api/questions
router.get('/', questionsMiddleware, (req, res) => res.status(200).json(req.questions))
// /api/questions/:id
router.get('/:id', questionMiddleware, (req, res) => {
  res.status(200).json(req.question)
})
// /api/questions
router.post('/', required, (req, res) => {
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
  required,
  questionMiddleware,
  (req, res) => {
    const answer = req.body
    const q = req.question
    answer.createdAt = new Date()
    answer.user = req.user
    q.answers.push(answer)
    res.status(201).json(answer)
})

export default router
