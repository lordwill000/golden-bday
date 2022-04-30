import Image from 'next/image'
import cms from 'helpers/cms'

export default function AreYouLost () {
  const { hero: { header, name } } = cms

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <div className="w-full lg:w-6/12">
        <div className='mx-auto'>
          <Image alt='logo' src="/Logo.png" width={302} height={283} priority />
        </div>
        <div className="text-d4 font-serif -mt-10 mb-6"
          dangerouslySetInnerHTML={{ __html: header }}>
        </div>
        <div className="space-y-8">
          <div className="text-d3 font-script">{name}</div>
          <p>
            Reach out to Cindy on +63 9069127521 to know more about this event
          </p>
        </div>
      </div>
    </div>
  )
}
