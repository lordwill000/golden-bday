import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrashIcon, CheckIcon, XIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { Disclosure, RadioGroup } from '@headlessui/react'

import Avatar from './Avatar'

const filterOptions = [
  {
    key: 'yes',
    label: 'Yes'
  },
  {
    key: 'no',
    label: 'No'
  },
  {
    key: 'not-yet',
    label: 'Not yet'
  }
]

const InviteesRecords = ({ invitees, summary, onDelete }) => {
  const [showingInvitees, setShowingInvitees] = useState(invitees)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setShowingInvitees(invitees)
    handleFilter(true)
  }, [invitees])

  useEffect(() => {
    if (selected) {
      handleFilter(false)
    }
  }, [selected])

  function handleFilter (clear) {
    if (!clear) {
      setShowingInvitees(invitees.filter(invitee => invitee.rsvp === selected.key))

      return
    }

    setSelected(null)
    setShowingInvitees(invitees)
  }

  const rsvpColor = (rsvp) => {
    switch (rsvp) {
      case 'no':
        return 'text-rose-600'
      case 'not-yet':
        return 'text-neutral-600'
      default:
        return 'text-lime-600'
    }
  }

  return (
    <div className="mt-2 space-y-5">
      <section>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex justify-between p-4 w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-md text-sm font-medium'>
                <span>Filter</span>
                <ChevronUpIcon
                  className={`${
                    !open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-slate-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className='p-5'>
                <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="sr-only">Sort</RadioGroup.Label>
                  <div className="flex gap-2">
                    {filterOptions.map(option => (
                      <RadioGroup.Option
                        key={option.label}
                        value={option}
                        className={({ active, checked }) =>
                          `${checked ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}
                          relative rounded-md p-2 cursor-pointer
                          border border-slate-900 dark:border-white flex focus:outline-none w-32`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`font-medium ${
                                      checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                  >
                                    {option.label}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              <div className={`flex-shrink-0 text-white ${checked ? 'opacity-1' : 'opacity-0'}`}>
                                <CheckIcon className="w-4 h-4" />
                              </div>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <button className="group admin-button mt-3" onClick={() => handleFilter(true)}>
                  <span className="admin-button__icon-wrapper">
                    <XIcon className="admin-button__icon" aria-hidden="false" />
                  </span>
                  Clear filter
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <div className='mt-2'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex justify-between p-4 w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-md text-sm font-medium'>
                  <span>Summary</span>
                  <ChevronUpIcon
                    className={`${
                      !open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-slate-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className='p-5'>
                  <dl>
                      {
                        Object.entries(summary).map(([key, value], index) => (
                          <div key={key}
                            className={`bg-white dark:bg-slate-900 py-3 sm:grid sm:grid-cols-3 sm:gap-4
                              ${index < Object.entries(summary).length - 1 ? 'border-b dark:border-white' : ''}`}
                          >
                            <dt className='text-sm font-medium text-gray-500 dark:text-slate-200'>{key}</dt>
                            <dl className='mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2'>{value}</dl>
                          </div>
                        ))
                      }
                  </dl>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </section>

      <section>
        <h3 className='text-lg text-slate-900 dark:text-white leading-6 font-medium mb-4'>
          Invitees
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          { showingInvitees.length
            ? (showingInvitees.map(({ _id, name, rsvp, profileBg }) => (
              <div key={_id} className="flex items-center gap-3 p-3
              border border-slate-900 dark:border-white rounded-md transition
              bg-slate-900 dark:bg-white
              hover:bg-slate-200 dark:hover:bg-slate-900
              text-white dark:text-slate-900
              hover:text-slate-900 dark:hover:text-white"
            >
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
              )))
            : 'No invitees'
          }
      </div>
      </section>

    </div>
  )
}

export default InviteesRecords