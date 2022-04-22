import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

import Layout from 'components/admin/AdminLayout'
import InviteesRecords from 'components/admin/InviteesRecords'

import axios from 'lib/axios'

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

const fetcher = url => axios.post(url).then(res => res.data)

const Invitees = () => {
  const [name, setName] = useState('')
  const [newRsvp, setNewRsvp] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')

  const { data, error, mutate } = useSWR('/invitees/all', fetcher)

  async function handleSubmit (e) {
    e.preventDefault()

    if (name && newRsvp) {
      setIsSubmitting(true)

      try {
        const { data, status } = await axios.post('/invitees/add', {
          name,
          rsvp: newRsvp
        })

        if (status !== 200) {
          setFormMessage(data.message)

          setIsSubmitting(false)

          return
        }

        setName('')
        setFormMessage(data.message)

        mutate()
      } catch (error) {
        console.log(error)
      }

      setIsSubmitting(false)
    }
  }

  async function handleDelete (id) {
    if (!id) return

    try {
      const { data: success, status } = await axios.delete('/invitees/delete', { data: { id } })

      if (status !== 200 || !success) {
        console.log(error, 'Error in deleting invitee')
        return
      }

      mutate()
    } catch (error) {
      console.log(error, 'Error in deleting invitee')
    }
  }

  function renderRsvp () {
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
                className="h-4 w-4 text-slate-600 border-gray-300"
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

  function renderInvitees () {
    if (error) {
      return <div className="text-rose-900">Failed to load invitees</div>
    }

    if (!data) {
      return <div className='text-neutral-900 dark:text-white'>Loading invitees</div>
    }

    return <InviteesRecords invitees={data.invitees}
        summary={data.summary}
        onDelete={handleDelete}
      />
  }

  return (
    <Layout>
      <section>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex justify-between p-4 w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-md text-sm font-medium'>
                  <span>Add invitee</span>
                  <ChevronUpIcon
                    className={`${
                      !open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-slate-500`}
                  />
              </Disclosure.Button>
              <Disclosure.Panel className="p-5">
                <form onSubmit={handleSubmit}>
                  <div className="shadow overflow-hidden rounded-md">
                    <div className="bg-white dark:bg-slate-900 space-y-4">
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
                            ? (
                              <svg className="animate-spin -h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              )
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

      {renderInvitees()}
    </Layout>
  )
}

export default Invitees
