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

export default function Rsvp ({ invitee }) {
  const [name, setName] = useState(invitee.name)
  const [rsvpSelected, setRsvpSelected] = useState(CHOICES[0].value)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  async function handleFormSubmit (e) {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const { data, status } = await axios.put('/invitees/edit', {
        id: invitee._id,
        rsvp: rsvpSelected
      })

      if (status !== 200) {
        console.log({ status }, 'Error in submitting form')

        setIsSubmitting(false)
      }

      console.log(data)
      setHasSubmitted(true)

      return
    } catch (error) {
      console.log(error, 'Error in submitting form')
    }

    setIsSubmitting(false)

    console.log('submit alo')
  }

  function renderForm () {
    if (hasSubmitted) {
      return (
        <p>Thank you for your response</p>
      )
    }

    if (invitee.rsvp === 'not-yet') {
      return (
        <>
          <p className='mb-14'>Please rsvp on or before date here and bawal mag plus 1 kek</p>

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
              className={`block ml-auto
                w-[180px] h-20
                border border-primary
                text-2xl hover:bg-white transition-colors]
                ${isSubmitting ? 'bg-neutral-600 pointer-events-none' : 'bg-accent'}`}
              disabled={isSubmitting}
            >
              {
                isSubmitting
                  ? <Loader colorClass="text-accent"/>
                  : 'Send'
              }

            </button>
          </form>

          <p>for questions, reach out to jamal on +63 9272443771</p>
        </>
      )
    }

    return (
      <p>You already RSVP. If you want to change your response, reach out to jamal on +63 9272443771</p>
    )
  }

  return (
    <section className="mt-20 mt:lg-40">
      <div className="w-full lg:w-6/12 mb-14">
        <div className="text-d2 font-script leading-[0.9] lg:leading-normal">RSVP</div>
      </div>

      <div className="w-full lg:w-6/12 mb-16 pl-12">
        {renderForm()}
      </div>

    </section>
  )
}
