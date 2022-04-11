import mongoose from 'mongoose'
import { isEmail } from 'validator'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
    validate: [isEmail, 'Please provide a valid email']
  }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
