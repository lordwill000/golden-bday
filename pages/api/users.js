import { getSession } from 'next-auth/react'

export default async function handler (req, res) {
  const session = await getSession({ req })

  console.log({ session }, 'sesh')

  switch (req.method) {
    case 'GET':
      res.status(200).json({
        name: 'allo'
      })
  }
}
