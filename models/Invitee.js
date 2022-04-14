import mongoose from 'mongoose'

const InviteeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    unique: [true, 'Name already exists']
  },
  rsvp: {
    type: String,
    required: true
  },
  profileBg: {
    type: String
  }

}, {
  timestamps: true
})

export default mongoose.models.Invitee || mongoose.model('Invitee', InviteeSchema)
