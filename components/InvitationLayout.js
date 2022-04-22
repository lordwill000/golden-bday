import Image from 'next/image'
import Head from 'next/head'

function InvitationLayout ({ children }) {
  return (
    <div className="container mx-auto px-4 min-h-screen font-serif text-lg">
      <Head>
        <title>Divine’s Golden Birthday</title>
      </Head>
      <div className="fixed left-0 top-0 h-screen w-screen overflow-hidden -z-[1]">
        <Image src="/marble-1.jpg" layout='fill' objectFit='cover' alt="marble-bg" priority />
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}

export default InvitationLayout
