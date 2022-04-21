import { getSession, signOut, useSession } from 'next-auth/react'
import React from 'react'

import InvitationLayout from 'components/InvitationLayout'
import Hero from './Hero'
import Details from './Details'
import Rsvp from './Rsvp'

const InvitationContent = () => {
  // Check if the user is authenticated from the client
  // const { data: session, status } = useSession()

  return (
    <InvitationLayout>
      <>
        <Hero />
        <Details/>
        <Rsvp/>
      </>
    </InvitationLayout>
  )

  // if (status === 'loading') {
  //   return <>Loading...</>
  // }

  // if (status === 'authenticated') {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }
  // if (status === 'unauthenticated') {
  //   return (
  //     <>
  //       Not signed in <br />
  //       <Link href='/api/auth/signin'>
  //         <a>Login</a>
  //       </Link>
  //     </>
  //   )
  // }
}

// export const getServerSideProps = async ctx => {
//   // Check if the user is authenticated from the server
//   const session = await getSession(ctx)
//   console.log({ session })
//   return {
//     props: {
//       session
//     }
//   }
// }

export default InvitationContent
