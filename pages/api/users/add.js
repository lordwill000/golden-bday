import { getSession } from 'next-auth/react'
import dbConnect from 'lib/mongoose'
import User from 'models/User'
import { randomizeTailwindColor } from 'helpers/utils'

export default async function handler (req, res) {
  const session = await getSession({ req })

  if (session && req.method === 'POST') {
    await dbConnect()

    console.log('connected to db...')

    const { name, email, theme } = req.body

    const emailExists = await User.findOne({ email })

    if (emailExists) {
      res.status(200).json({
        message: 'User already exists'
      })

      return
    }

    const user = await User.create({
      name,
      email,
      theme,
      profileBg: randomizeTailwindColor()
    })

    if (user) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        message: `${user.name} can now access the dashboard`
      })
    }

    return
  }
  res.status(401).send('Unauthorized')
}
