import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/solid'
import Avatar from './Avatar'

const InviteesRecords = ({ invitees, summary, onDelete }) => {
  const [query, setQuery] = useState('')
  const [showingInvitees, setShowingInvitees] = useState(invitees)

  useEffect(() => {
    setShowingInvitees(invitees)
  }, [invitees])

  const rsvpColor = (rsvp) => {
    switch (rsvp) {
      case 'no':
        return 'text-rose-500'
      case 'not-yet':
        return 'text-neutral-500'
      default:
        return 'text-lime-500'
    }
  }

  return (
    <>
      <section>
        <div className="bg-slate-900 dark:bg-white rounded-t-md px-4 py-5 sm:px-6">
          <h3 className="text-lg text-white dark:text-slate-900 leading-6 font-medium">Summary</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {
              Object.entries(summary).map(([key, value], index) => (
                <div key={key}
                  className={`bg-white dark:bg-slate-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
                    ${index < Object.entries(summary).length - 1 ? 'border-b dark:border-white' : ''}`}
                >
                  <dt className='text-sm font-medium text-gray-500 dark:text-slate-200'>{key}</dt>
                  <dl className='mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2'>{value}</dl>
                </div>
              ))
            }
          </dl>
        </div>
      </section>

      <div className="mb-5">
        <label htmlFor="Search" className="admin-form-field__label">
          Search
        </label>
        <input type="text"
          name="Search"
          id="Search"
          placeholder='Lordwill Mabalot'
          className="admin-form-field__input"
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {
          showingInvitees.map(({ _id, name, rsvp, profileBg }) => (
              <div key={_id} className="flex items-center gap-3 p-3
              border border-slate-900 dark:border-white rounded-md transition
              bg-slate-900 dark:bg-white
              hover:bg-slate-200 dark:hover:bg-slate-900
              text-white dark:text-slate-900
              hover:text-slate-900dark:hover:text-white ">
                <Avatar otherClasses="shrink-0" name={name} profileBg={profileBg}/>
                <Link href={`/admin/invitees/${_id}`} passHref>
                  <a className='grow'>
                    <p>{name}</p>
                    <p><small>RSVP: &nbsp;
                      <span className={rsvpColor(rsvp)}>
                        {rsvp.replace('-', ' ').toUpperCase()}</span>
                      </small>
                    </p>
                  </a>
                </Link>
                <button className="shrink-0" onClick={() => onDelete(_id)}>
                  <TrashIcon className='block h-6 w-6' />
                </button>
              </div>
          ))
        }
      </div>

    </>
  )
}

export async function getServerSideProps (ctx) {
  // await dbConnect()

  // const invitees = await Invitee.find().all()

  // return {
  //   props: { invitees: JSON.parse(JSON.stringify(invitees)) }
  // }
}

export default InviteesRecords
