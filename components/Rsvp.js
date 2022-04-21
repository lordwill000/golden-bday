import { useState } from 'react'

const CHOICES = [
  {
    value: 'yes',
    label: 'Accepts with pleasure'
  },
  {
    value: 'no',
    label: 'Declines with regrets'
  }
]

export default function Rsvp () {
  const [name, setName] = useState('')
  const [rsvpSelected, setRsvpSelected] = useState(CHOICES[0].value)

  return (
    <section className="mt-20 mt:lg-40">
      <div className="w-full lg:w-6/12 mb-14">
        <div className="text-d2 font-script leading-[0.9] lg:leading-normal">RSVP</div>
        <div className="pl-12">
          <p>Please rsvp on or before date here and bawal mag plus 1 kek</p>
        </div>
      </div>

      <div className="w-full lg:w-6/12 mb-16 pl-12">
        <form className="space-y-5 mb-10">
          <div className="relative after:absolute after:bottom-4
            after:h-px after:w-full
            after:bg-primary"
          >
            <label htmlFor="name" className="block">Name:</label>
            <input type="text"
              id='name'
              placeholder="Input your name"
              className="block w-full border-none font-script text-6xl
                bg-transparent focus:outline-none focus:ring-transparent p-0"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {
              CHOICES.map(({ value, label }) => {
                return (
                  <label htmlFor={value} key={value} className="block">
                    <input type="radio"
                      name="response"
                      value={value}
                      id={value}
                      className="checked:bg-primary checked:hover:bg-primary focus:ring-primary ring-primary"
                      onChange={e => setRsvpSelected(e.target.value)}
                    />
                    <span className="ml-4">{label}</span>
                  </label>
                )
              })
            }
          </div>

          <button type="submit"
            className='block ml-auto
              w-[180px] h-20
              border border-primary
              text-2xl bg-accent
              hover:bg-white transition-colors'
          >
            Send
          </button>
        </form>

        <p>for questions, reach out to jamal on +63 9272443771</p>
      </div>

    </section>
  )
}
