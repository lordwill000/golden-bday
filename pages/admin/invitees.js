import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import useSWR from 'swr'

import Layout from 'components/admin/AdminLayout'
import InviteesRecords from 'components/admin/InviteesRecords'
import Loader from 'components/Loader'

import axios from 'lib/axios'

const rsvp = [
  {
    label: 'Not yet RSVP',
    value: 'not-yet'
  },
  {
    label: 'Yes',
    value: 'yes'
  },
  {
    label: 'No',
    value: 'no'
  }
]

const fetcher = url => axios.post(url).then(res => res.data)

const Invitees = () => {
  const [name, setName] = useState('')
  const [newRsvp, setNewRsvp] = useState(rsvp[0].value)
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
        {rsvp.map(({ value, label }) => {
          return (
            <div key={value}
              className="flex items-center"
            >
              <input
                id={label}
                value={value}
                name="push-notifications"
                type="radio"
                className="h-4 w-4 text-slate-600 border-gray-300"
                checked={newRsvp === value}
                onChange={e => setNewRsvp(e.target.value)}
              />
              <label htmlFor={label} className="ml-3 block text-sm font-medium text-gray-700 dark:text-white">
                {label}
              </label>
            </div>
          )
        })}
      </>
    )
  }

  function renderInvitees () {
    if (error) {
      return <div className="text-rose-900 mt-5">Failed to load invitees</div>
    }

    if (!data) {
      return <div className='text-neutral-900 dark:text-white mt-5'>Loading invitees</div>
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
                        <label htmlFor="name" className="admin-form-field__label">
                          Name
                        </label>
                        <input type="text"
                          name="name"
                          id="name"
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
                            ? <Loader colorClass='dark:text-slate-900 text-accent' />
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
