import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }
})

UserSchema.plugin(uniqueValidator)

UserSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export default model('User', UserSchema)
