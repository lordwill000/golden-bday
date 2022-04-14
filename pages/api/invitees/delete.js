import { getSession } from 'next-auth/react'
import dbConnect from 'lib/mongoose'
import Invitee from 'models/Invitee'

export default async function handler (req, res) {
  const session = await getSession({ req })

  if (session && req.method === 'DELETE') {
    await dbConnect()

    const invitee = await Invitee.findById(req.body.id)

    if (!invitee) {
      res.status(200).json({
        success: false,
        message: 'ID not found'

      })

      return
    }

    await Invitee.findByIdAndRemove(req.body.id)

    res.status(200).json({
      success: true
    })
  }
}
