import dynamic from 'next/dynamic'

import dbConnect from 'lib/mongoose'
import Invitee from 'models/Invitee'

import InvitationLayout from 'components/InvitationLayout'

import cms from 'helpers/cms'

const Hero = dynamic(() => import('components/Hero'))
const Details = dynamic(() => import('components/Details'))
const List = dynamic(() => import('components/List'))
const Rsvp = dynamic(() => import('components/Rsvp'))
const AreYouLost = dynamic(() => import('components/AreYouLost'))

export default function Invitation ({ invitee, cms: { hero, details, roses, treasures, candles, rsvp } }) {
  return (
    <InvitationLayout>
      {
        invitee
          ? <>
            <Hero cms={ hero }/>
            <Details cms={ details }/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-20 lg:mt-40 mb-20">
              <List title="15 Roses" items={roses} parentClass="mb-20 lg:mb-0" />
              <List title="15 Treasures" items={treasures} />
            </div>

            <List title="20 Candles"
              items={candles}
              parentClass="mb-20 lg:mb-0"
              cols={2} />

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
