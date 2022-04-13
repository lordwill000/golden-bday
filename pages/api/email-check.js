import dbConnect from 'lib/mongoose'
import User from 'models/User'

export default async function handler (req, res) {
  if (req.method === 'POST' && req.body.email) {
    await dbConnect()

    console.log('connected to db...')

    const email = req.body.email

    const emailExists = await User.findOne({ email })

    if (!emailExists) {
      res.status(400)
        .json({
          success: false,
          message: 'Email does not exist'
        })

      throw new Error('Email does not exist')
    }

    res.status(200).json({
      success: true
    })
  }
}
