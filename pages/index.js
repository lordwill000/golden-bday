import React from 'react'

import InvitationLayout from 'components/InvitationLayout'
import Hero from 'components/Hero'
import Details from 'components/Details'

const Homepage = () => {
  return (
    <InvitationLayout>
      <>
        <Hero />
        <Details/>
      </>
    </InvitationLayout>
  )
}

export default Homepage
