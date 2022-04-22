import { getSession } from 'next-auth/react'
import User from 'models/User'

export default async function handler (req, res) {
  const session = await getSession({ req })

  if (session && req.method === 'GET') {
    const allUsers = await User.find().all()

    if (!allUsers) {
      res.status(200).json({
        success: false,
        message: 'Something went wrong in fetching from the DB'
      })
      return
    }

    res.status(200).json({
      users: JSON.parse(JSON.stringify(allUsers))
    })
  }
}
