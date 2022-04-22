import dbConnect from 'lib/mongoose'
import Invitee from 'models/Invitee'

export default async function handler (req, res) {
  await dbConnect()

  if (req.method === 'PUT') {
    const { id, rsvp } = req.body

    const invitee = await Invitee.findById(id)

    if (!invitee) {
      res.status(400).json({
        success: false,
        message: 'Invitee not found'
      })

      return
    }

    const updatedInvitee = await Invitee.findByIdAndUpdate(id, { rsvp })

    res.status(200).json({
      ...updatedInvitee,
      success: true
    })
  }
}
