import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/outline'

const Hero = ({ header, name, address, date }) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center">
      <div className="w-full lg:w-3/6 mx-auto text-center px-4">
        <div className='mx-auto'>
          <Image alt='logo' src="/Logo.png" width={302} height={283} />
        </div>
        <div className="text-d4 font-serif -mt-10 mb-6">
          JOIN US to celebrate
          <br />the fiftieth birthday of
        </div>
        <div className="space-y-8">
          <div className="text-d3 font-script">Lordwill Mabalot</div>

          <div>
            saturday, may 5 2022 at 11am
            <br/>
            <span className='text-sm'>30 days to go</span>
          </div>

          <div>
          divine’s place
          <br/>
          351 sitio ipil brgy. bataan
          <br/>
          san juan, batangas
          </div>
        </div>
      </div>

      <div className='absolute bottom-5 text-center px-4'>
        <a href="#" className='transition-transform hover:translate-y-1 block'>
          <span>More details</span>
          <ChevronDownIcon className='h-6 w-6 stroke-1 text-black mx-auto'/>
        </a>
      </div>
    </div>
  )
}

export default Hero
