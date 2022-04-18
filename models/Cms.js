import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
  src: String,
  height: Number,
  width: Number
})

const DetailsSchema = new mongoose.Schema({
  header: String,
  copy: String,
  image: [ImageSchema]
})

const CmsSchema = new mongoose.Schema({
  heroHeader: String,
  heroName: String,
  heroDate: {
    type: Date,
    default: Date.now
  },
  heroAddress: String,
  details: [DetailsSchema],
  rsvpHeader: String,
  rsvpCopy: String,
  rsvpCopy2: String
})

export default mongoose.models.CMS || mongoose.model('CMS', CmsSchema)
