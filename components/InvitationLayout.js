import Image from 'next/image'

function InvitationLayout ({ children }) {
  return (
    <div className="min-h-screen font-serif text-lg">
      <div className="fixed h-screen w-screen overflow-hidden -z-[1]">
        <Image src="/marble-1.jpg" layout='fill' objectFit='cover' alt="marble-bg"/>
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}

export default InvitationLayout
