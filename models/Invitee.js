import mongoose from 'mongoose'
import slugGenerator from 'mongoose-slug-generator'

mongoose.plugin(slugGenerator)

const InviteeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    unique: [true, 'Name already exists']
  },
  slug: {
    type: String,
    slug: 'name'
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
