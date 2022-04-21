import dynamic from 'next/dynamic'

import dbConnect from 'lib/mongoose'
import Invitee from 'models/Invitee'

import InvitationLayout from 'components/InvitationLayout'
import Hero from 'components/Hero'
import Details from 'components/Details'

const Rsvp = dynamic(() => import('components/Rsvp'))

export default function Invitation ({ isInvited }) {
  console.log(isInvited)
  return (
    <InvitationLayout>
      <Hero/>
      <Details/>
      <Rsvp/>
    </InvitationLayout>
  )
}

export const getServerSideProps = async ctx => {
  // Check if the user is authenticated from the server
  await dbConnect()

  const slug = ctx.query.slug

  const isInvited = await Invitee.findOne({ slug })

  return {
    props: {
      isInvited
    }
  }
}
