import Image from 'next/image'

const Details = ({ cms: details }) => {
  return (
    <section id="details" className='space-y-20'>
      {
        details.map(({ header, image, copy1, copy2, copy3 }, index) => {
          return (
            <section key={index}
              className={`${index % 2 ? 'text-right' : 'text-left'} flex flex-wrap lg:flex-nowrap relative`}
            >
              {
                index % 2
                  ? (
                      <>
                        <div className='w-full lg:w-8/12 order-2 lg:order-1'>
                          <div className="mt-12 lg:mt-20">
                            <Image src={image}
                              alt={`${header} image`}
                              height={image.height * 2}
                              width={image.width * 2}
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-5/12 lg:absolute lg:right-0 order-1 lg:order-2">
                          <div className="text-d2 font-script leading-[0.9] lg:leading-normal">{header}</div>
                          <div className="pr-12 space-y-2">
                            <p>{copy1}</p>
                            <p>{copy2}</p>
                            <p>{copy3}</p>
                          </div>
                        </div>
                      </>
                    )
                  : (
                    <>
                      <div className='w-full lg:w-5/12 lg:absolute lg:z-10'>
                        <div className="text-d2 font-script leading-[0.9] lg:leading-normal">{header}</div>
                        <div className="pl-12 space-y-2">
                          <p>{copy1}</p>
                          <p>{copy2}</p>
                          <p>{copy3}</p>
                        </div>
                      </div>
                      <div className='w-full lg:w-8/12 lg:ml-auto'>
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
    </section>
  )
}

export default Details
