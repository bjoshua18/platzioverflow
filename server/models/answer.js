import { Schema, model } from 'mongoose'

const AnswerSchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: String, default: Date.now, required: true },
})

export default model('Answer', AnswerSchema)
