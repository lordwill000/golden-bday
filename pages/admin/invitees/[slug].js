import { useState } from 'react'
import { SaveIcon } from '@heroicons/react/solid'
import AdminRow from 'components/admin/AdminRow'

import Layout from 'components/admin/AdminLayout'

import dbConnect from 'lib/mongoose'
import axios from 'lib/axios'

import Invitee from 'models/Invitee'

const CHOICES = [
  {
    value: 'yes',
    label: 'Yes'
  },
  {
    value: 'no',
    label: 'No'
  },
  {
    value: 'not-yet',
    label: 'Not yet'
  }
]

export default function AdminInvitee ({ invitee }) {
  const [name, setName] = useState(invitee.name)
  const [rsvpSelected, setRsvpSelected] = useState(invitee.rsvp)
  const [isSaving, setIsSaving] = useState(false)
  const [displayName, setDisplayName] = useState(invitee.name)

  function createdAt () {
    const { createdAt } = invitee

    const createdAtDate = new Date(createdAt)

    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `${month[createdAtDate.getMonth()]} ${createdAtDate.getDay()}, ${createdAtDate.getFullYear()}`
  }

  async function handleSave (e) {
    e.preventDefault()

    setIsSaving(true)

    try {
      const { data: { _doc }, status } = await axios.put('/invitees/edit', {
        id: invitee._id,
        name,
        rsvp: rsvpSelected
      })

      if (status !== 200) {
        console.log('Error in saving details')
        setIsSaving(false)
        return
      }

      setDisplayName(_doc.name)
    } catch (error) {
      console.log(error, 'Error in saving details')
    }

    setIsSaving(false)
  }

  return (
    <Layout>
      <div className="bg-slate-900 dark:bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-white dark:text-slate-900">
              {displayName}
              <p className="text-sm text-slate-500 dark:white">
                Created at: {createdAt()}
              </p>
            </h3>
            <button className='admin-button' onClick={handleSave}>
              {
                isSaving
                  ? (
                    <svg className="animate-spin -h-5 w-5 text-accent dark:text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                    )
                  : (
                    <>
                      <span className="admin-button__icon-wrapper">
                        <SaveIcon className="admin-button__icon" aria-hidden="true" />
                      </span>
                      Save changes
                    </>
                    )
              }

            </button>
          </div>

        </div>
        <div className="border-t border-gray-200">
          <dl>
            <AdminRow classes="bg-gray-50" label="Name">
              <textarea name="hero-header"
                className="admin-input rounded-md"
                placeholder="Input name"
                value={name}
                onChange={ e => setName(e.target.value) }
              ></textarea>
            </AdminRow>

            <AdminRow classes="bg-whte" label="RSVP">
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
                      <span className="ml-4 text-gray-900 sm:text-sm">{label}</span>
                    </label>
                  )
                })
              }
            </AdminRow>

          </dl>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  await dbConnect()
  const slug = ctx.query.slug

  const invitee = await Invitee.findOne({ slug })

  return {
    props: {
      invitee: JSON.parse(JSON.stringify(invitee))
    }
  }
}
