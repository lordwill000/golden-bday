import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

export default function Dashboard () {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated () {
      router.push('/api/auth/signin')
    }
  })

  if (status === 'loading') {
    return 'Loading or not authenticated...'
  }

  return (
    <>
      <p>user is signed in</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}
