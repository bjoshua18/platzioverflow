import { Router } from "express"
import { required } from '../middleware'
import { question } from '../db-api'
import { handleError } from "../utils"

const router = Router()

// /api/questions
router.get('/', async (req, res) => {
  try {
    const questions = await question.findAll()
    res.status(200).json(questions)
  } catch (error) {
    handleError(error, res)
  }
})
// /api/questions/:id
router.get('/:id', async (req, res) => {
  try {
    const q = await question.findById(req.params.id)
    res.status(200).json(q)
  } catch (error) {
    handleError(error, res)
  }
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
  (req, res) => {
    const answer = req.body
    const q = req.question
    answer.createdAt = new Date()
    answer.user = req.user
    q.answers.push(answer)
    res.status(201).json(answer)
})

export default router
