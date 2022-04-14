import { Disclosure } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/outline'
import { useState } from 'react'

import Layout from 'components/AdminLayout'

import axios from 'lib/axios'
import dbConnect from 'lib/mongoose'
import Invitee from 'models/Invitee'

const rsvp = [
  {
    label: 'Yes',
    value: 'yes'
  },
  {
    label: 'No',
    value: 'no'
  },
  {
    label: 'Not yet RSVP',
    value: 'not-yet'
  }
]

const Invitees = ({ invitees }) => {
  const [name, setName] = useState('')
  const [newRsvp, setNewRsvp] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')

  const renderRsvp = () => {
    return (
      <>
        {rsvp.map(response => {
          return (
            <div key={response.value}
              className="flex items-center"
            >
              <input
                id={response.label}
                value={response.value}
                name="push-notifications"
                type="radio"
                className="focus:ring-slate-500 h-4 w-4 text-slate-600 border-gray-300"
                onChange={e => setNewRsvp(e.target.value)}
              />
              <label htmlFor={response.label} className="ml-3 block text-sm font-medium text-gray-700 dark:text-white">
                {response.label}
              </label>
            </div>
          )
        })}
      </>
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (name && newRsvp) {
      setIsSubmitting(true)

      try {
        const { data, status } = await axios.post('/invitee/add', {
          name,
          rsvp: newRsvp
        })

        if (status !== 200) {
          setFormMessage(data.message)

          setIsSubmitting(false)

          return
        }

        setFormMessage(data.message)
      } catch (error) {
        console.log(error)
      }

      setIsSubmitting(false)

      console.log('allo')
    }
  }

  return (
    <Layout>
      <>
        <section className='mb-6'>
          <Disclosure>
            {({ open }) => (
              <>
                <div className="flex justify-end">
                  <Disclosure.Button className="group admin-button">
                    <span className="admin-button__icon-wrapper">
                      <PlusIcon className="admin-button__icon" aria-hidden="false" />
                    </span>
                    Add invitee
                  </Disclosure.Button>
                </div>

                <Disclosure.Panel className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="shadow overflow-hidden rounded-md">
                      <div className="px-4 py-5 bg-white dark:bg-slate-900 sm:p-6 space-y-4">
                        <div>
                          <label htmlFor="first-name" className="admin-form-field__label">
                            Name
                          </label>
                          <input type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            placeholder='Lordwill Mabalot'
                            className="admin-form-field__input"
                            onChange={e => setName(e.target.value)}
                          />
                        </div>

                        <div className="mt-4 space-y-3">
                          <p className="text-sm font-medium text-gray-700 dark:text-slate-200">RSVP</p>

                          {renderRsvp()}
                        </div>

                        <button ype="submit"
                          className="admin-button"
                        >
                          {
                            isSubmitting
                              ? <svg className="animate-spin -h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                              : 'Submit'
                          }

                        </button>

                        {
                          formMessage && (
                          <p className="text-sm font-medium text-gray-700 dark:text-slate-200">{formMessage}</p>
                          )
                        }
                      </div>

                    </div>
                  </form>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </section>

        <section>

        </section>
      </>
    </Layout>
  )
}

export async function getServerSideProps (ctx) {
  await dbConnect()

  const invitees = await Invitee.find().all().limit(10)

  return {
    props: { invitees: JSON.parse(JSON.stringify(invitees)) }
  }
}

export default Invitees
