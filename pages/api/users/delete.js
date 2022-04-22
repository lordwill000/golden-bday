import { getSession } from 'next-auth/react'
import dbConnect from 'lib/mongoose'
import User from 'models/User'

export default async function handler (req, res) {
  const session = await getSession({ req })

  if (session && req.method === 'DELETE') {
    await dbConnect()

    const user = await User.findById(req.body.id)

    if (!user) {
      res.status(200).json({
        success: false,
        message: 'ID not found'

      })

      return
    }

    await User.findByIdAndRemove(req.body.id)

    res.status(200).json({
      success: true
    })
  }
}
