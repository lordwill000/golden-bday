import dynamic from 'next/dynamic'

import dbConnect from 'lib/mongoose'
import Invitee from 'models/Invitee'

import InvitationLayout from 'components/InvitationLayout'
import Hero from 'components/Hero'
import Details from 'components/Details'
import AreYouLost from 'components/AreYouLost'

import cms from 'helpers/cms'

const Rsvp = dynamic(() => import('components/Rsvp'))

export default function Invitation ({ invitee, cms: { hero, details, rsvp } }) {
  return (
    <InvitationLayout>
      {
        invitee
          ? <>
            <Hero cms={ hero }/>
            <Details cms={ details }/>
            <Rsvp cms={ rsvp } invitee={invitee}/>
          </>
          : <AreYouLost />
      }
    </InvitationLayout>
  )
}

export const getServerSideProps = async ctx => {
  await dbConnect()

  const slug = ctx.query.slug

  const invitee = await Invitee.findOne({ slug })

  return {
    props: {
      invitee: JSON.parse(JSON.stringify(invitee)),
      cms
    }
  }
}
