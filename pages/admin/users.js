import { Disclosure } from '@headlessui/react'
import { TrashIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import useSWR from 'swr'

import Layout from 'components/admin/AdminLayout'
import Loader from 'components/Loader'
import ProfileCard from 'components/admin/ProfileCard'

import axios from 'lib/axios'

const THEME = [
  {
    value: 'light',
    label: 'Light'
  },
  {
    value: 'dark',
    label: 'Dark'
  }
]

const fetcher = url => axios.get(url).then(res => res.data)

const Users = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [theme, setTheme] = useState(THEME[0].value)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')

  const { data, error, mutate } = useSWR('/users/all', fetcher)

  async function handleSubmit (e) {
    e.preventDefault()

    if (name && email) {
      setIsSubmitting(true)

      try {
        const { data, status } = await axios.post('/users/add', {
          name, email, theme
        })

        if (status !== 200) {
          setFormMessage(data.message)

          setIsSubmitting(false)

          return
        }

        setName('')
        setEmail('')
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
      const { data: success, status } = await axios.delete('/users/delete', { data: { id } })

      if (status !== 200 || !success) {
        console.log(error, 'Error in deleting user')
        return
      }

      mutate()
    } catch (error) {
      console.log(error, 'Error in deleting user')
    }
  }

  function renderTheme () {
    return (
      <>
        {THEME.map(({ value, label }) => {
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
                checked={theme === value}
                onChange={e => setTheme(e.target.value)}
              />
              <label htmlFor={label}
                className="ml-3 block text-sm font-medium
                text-gray-700 dark:text-white"
              >
                {label}
              </label>
            </div>
          )
        })}
      </>
    )
  }

  function renderUsers () {
    if (error) {
      return <div className="text-rose-900 mt-5">Failed to load users</div>
    }

    if (!data) {
      return <div className='text-neutral-900 dark:text-white mt-5'>Loading users</div>
    }

    return (
      <section className='mt-5'>
        <h3 className='text-lg text-slate-900 dark:text-white leading-6 font-medium mb-4'>
          Users
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          { data.users.length
            ? (data.users.map(user => (
                <ProfileCard key={user._id} user={user}>
                  <button className="shrink-0" onClick={() => handleDelete(user._id)}>
                    <TrashIcon className='block h-6 w-6' />
                  </button>
                </ProfileCard>
              )))
            : 'No users'
          }
        </div>
      </section>
    )
  }

  return (
    <Layout>
      <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex justify-between p-4 w-full
                bg-slate-900 dark:bg-white
                text-white dark:text-slate-900
                rounded-md text-sm font-medium'
              >
                  <span>Add User</span>
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

                      <div>
                        <label htmlFor="email" className="admin-form-field__label">
                          Email
                        </label>
                        <input type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          placeholder='lordwill.mabalot@gmail.com'
                          className="admin-form-field__input"
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mt-4 space-y-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                          Profile theme
                        </p>

                        {renderTheme()}
                      </div>

                      <button ype="submit"
                        className="admin-button"
                      >
                        {
                          isSubmitting
                            ? (
                              <Loader/>
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
      {renderUsers()}
    </Layout>
  )
}

export default Users
