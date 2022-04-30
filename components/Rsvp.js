import { useState } from 'react'

import Loader from './Loader'

import axios from 'lib/axios'

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

export default function Rsvp ({
  invitee,
  cms: {
    header,
    notYet,
    queries,
    thankYou,
    done
  }
}) {
  const [name, setName] = useState(invitee.name)
  const [rsvpSelected, setRsvpSelected] = useState(CHOICES[0].value)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  async function handleFormSubmit (e) {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const { status } = await axios.put('/invitees/edit', {
        id: invitee._id,
        rsvp: rsvpSelected
      })

      if (status !== 200) {
        console.log({ status }, 'Error in submitting form')

        setIsSubmitting(false)
      }

      setHasSubmitted(true)

      return
    } catch (error) {
      console.log(error, 'Error in submitting form')
    }

    setIsSubmitting(false)
  }

  function renderForm () {
    if (hasSubmitted) {
      return (
        <p>{thankYou}</p>
      )
    }

    if (invitee.rsvp === 'not-yet') {
      return (
        <>
          <p className='mb-14'>{notYet}</p>

          <form className="space-y-5 mb-10" onSubmit={handleFormSubmit}>
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
                        checked={rsvpSelected === value}
                        className="checked:bg-primary checked:hover:bg-primary
                          focus:ring-primary ring-primary"
                        onChange={e => setRsvpSelected(e.target.value)}
                      />
                      <span className="ml-4">{label}</span>
                    </label>
                  )
                })
              }
            </div>

            <button type="submit"
              className={`block ml-auto
                w-[180px] h-20
                border border-primary
                text-2xl hover:bg-white transition-colors]
                ${isSubmitting ? 'bg-neutral-600 pointer-events-none' : 'bg-accent'}`}
              disabled={isSubmitting}
            >
              {
                isSubmitting
                  ? <Loader />
                  : 'Send'
              }

            </button>
          </form>

          <p>{queries}</p>
        </>
      )
    }

    return (
      <p>{done}</p>
    )
  }

  return (
    <section className="mt-20 lg:mt-40">
      <div className="w-full lg:w-6/12 mb-14">
        <div className="text-d2 font-script leading-[0.9] lg:leading-normal">
          {header}
        </div>
      </div>

      <div className="w-full lg:w-6/12 mb-16 pl-12">
        {renderForm()}
      </div>

    </section>
  )
}
