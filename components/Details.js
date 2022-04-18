import { useState } from 'react'
import Image from 'next/image'

const Details = () => {
  const [invDetails, setInvDetails] = useState([
    {
      header: 'Attire',
      image: {
        src: '/Group 2.png',
        height: 634,
        width: 753
      },
      copy: 'Bacon ipsum dolor amet spare ribs jerky sausage boudin short ribs ground round pork kevin. Sausage ham hock sirloin kevin porchetta spare ribs, alcatra meatloaf shankle landjaeger tongue picanha.'
    },
    {
      header: 'Bring a gift',
      image: {
        src: '/gift.png',
        height: 648,
        width: 751
      },
      copy: 'Bacon ipsum dolor amet spare ribs jerky sausage boudin short ribs ground round pork kevin. Sausage ham hock sirloin kevin porchetta spare ribs, alcatra meatloaf shankle landjaeger tongue picanha.'
    }
  ])

  return (
    <div className='space-y-20'>
      {
        invDetails.map(({ header, image, copy }, index) => {
          return (
            <section key={index}
              className={`${index % 2 ? 'text-right' : 'text-left'} flex flex-wrap lg:flex-nowrap relative`}
            >
              {
                index % 2
                  ? (
                      <>
                        <div className='w-full lg:w-9/12 order-2 lg:order-1'>
                          <div className="mt-12 lg:mt-20">
                            <Image src={image}
                              alt={`${header} image`}
                              height={image.height * 2}
                              width={image.width * 2}
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 lg:absolute lg:right-0 order-1 lg:order-2">
                          <div className="text-d2 font-script leading-[0.9] lg:leading-normal">{header}</div>
                          <div className="pr-12">
                            <p>{copy}</p>
                          </div>
                        </div>
                      </>
                    )
                  : (
                    <>
                      <div className='w-full lg:w-4/12 lg:absolute lg:z-10'>
                        <div className="text-d2 font-script leading-[0.9] lg:leading-normal">{header}</div>
                        <div className="pl-12">
                          <p>{copy}</p>
                        </div>
                      </div>
                      <div className='w-full lg:w-9/12 lg:ml-auto'>
                        <div className="mt-12 lg:mt-20">
                          <Image src={image}
                            alt={`${header} image`}
                            height={image.height * 2}
                            width={image.width * 2}
                          />
                        </div>
                      </div>
                    </>
                    )
              }
            </section>
          )
        })
      }
    </div>
  )
}

export default Details
