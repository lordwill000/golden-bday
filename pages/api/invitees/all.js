import { getSession } from 'next-auth/react'
import dbConnect from 'lib/mongoose'
import Invitee from 'models/Invitee'

export default async function handler (req, res) {
  const session = await getSession({ req })

  if (session && req.method === 'POST') {
    await dbConnect()

    const allInvitees = await Invitee.find().all()

    if (!allInvitees) {
      res.status(200).json({
        success: false,
        message: 'Something went wrong in fetching from the DB'
      })
      return
    }

    const invitees = JSON.parse(JSON.stringify(allInvitees))

    res.status(200).json({
      invitees,
      summary: {
        total: invitees.length,
        'Will attend': invitees.filter(invitee => invitee.rsvp === true || invitee.rsvp === 'yes').length,
        'Will not attend': invitees.filter(invitee => invitee.rsvp === 'no').length,
        'Not yet RSVP': invitees.filter(invitee => invitee.rsvp === 'not-yet').length
      }
    })

    return
  }
  res.status(401).send('Unauthorized')
}
