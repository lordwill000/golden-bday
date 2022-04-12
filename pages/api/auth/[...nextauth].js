import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import EmailProvider from 'next-auth/providers/email'
import clientPromise from 'lib/mongodb'
import dbConnect from 'lib/mongoose'
import User from 'models/User'

const THIRTY_DAYS = 30 * 24 * 60 * 60
const THIRTY_MINUTES = 30 * 60

export default NextAuth({
  pages: {
    signIn: '/login',
    verifyRequest: '/verify-request'
  },
  session: {
    strategy: 'jwt',
    maxAge: THIRTY_DAYS,
    updateAge: THIRTY_MINUTES
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_SERVER_FROM
    })
  ],
  callbacks: {
    async session ({ session }) {
      await dbConnect()

      const user = await User.findOne({ email: session.user.email })

      return {
        ...session.user,
        ...user._doc
      }
    }
  }
})
