import { getSession } from 'next-auth/react'
import dbConnect from 'lib/mongoose'
import Invitee from 'models/Invitee'
import { randomizeTailwindColor } from 'helpers/utils'

export default async function handler (req, res) {
  const session = await getSession({ req })

  if (session && req.method === 'POST') {
    await dbConnect()

    console.log('connected to db...')

    const { name, rsvp } = req.body

    const inviteeExists = await Invitee.findOne({ name })

    if (inviteeExists) {
      res.status(200).json({
        message: `${name} is already invited`
      })

      return
    }

    const invitee = await Invitee.create({
      name,
      rsvp,
      profileBg: randomizeTailwindColor()
    })

    if (invitee) {
      res.status(200).json({
        _id: invitee.id,
        name: invitee.name,
        rsvp: invitee.rsvp,
        message: `${invitee.name} has been added to your invitees`
      })
    }

    return
  }
  res.status(401).send('Unauthorized')
}
