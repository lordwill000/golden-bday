import Image from 'next/image'
import { Link } from 'react-scroll'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'

export default function Hero ({ cms: { header, name, address, date } }) {
  const [newDate, setNewDate] = useState()

  useEffect(() => {
    const oneDay = 1000 * 60 * 60 * 24
    const currentDate = new Date()
    const birthdate = new Date(currentDate.getFullYear(), 4, 8)

    const daysLeft = Math.round(birthdate.getTime() - currentDate.getTime()) / (oneDay)

    setNewDate(daysLeft.toFixed(0))
  }, [])

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center mb-24 md:mb-40">
      <div className="w-full lg:w-3/6 mx-auto mt-auto text-center">
        <div className='mx-auto'>
          <Image alt='logo' src="/Logo.png" width={302} height={283} priority />
        </div>
        <div className="text-d4 font-serif -mt-10 mb-6"
          dangerouslySetInnerHTML={{ __html: header }}>
        </div>
        <div className="space-y-8">
          <div className="text-d3 font-script">{name}</div>

          <div>
            {date}
            <br/>
            <span className='text-sm'>{newDate} days to go</span>
          </div>

          <div dangerouslySetInnerHTML={{ __html: address }}></div>
        </div>
      </div>

      <div className='mt-auto pb-8 text-center'>
        <Link to='details'
          smooth={true}
          className='transition-transform hover:translate-y-1 block cursor-pointer'
        >
          <span>More details</span>
          <ChevronDownIcon className='h-6 w-6 stroke-1 text-black mx-auto'/>
        </Link>
      </div>
    </section>
  )
}
