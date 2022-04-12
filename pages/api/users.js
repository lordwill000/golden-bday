import { getSession } from 'next-auth/react'

export default async function handler (req, res) {
  await getSession({ req })
  switch (req.method) {
    case 'GET':
      res.status(200).json({
        name: 'allo'
      })
  }
}
