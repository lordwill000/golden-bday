import Head from 'next/head'
import { LockClosedIcon } from '@heroicons/react/solid'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import axios from 'lib/axios'

const Login = () => {
  const [email, setEmail] = useState('')

  const sendLoginVerification = async e => {
    e.preventDefault()

    try {
      const { data: success } = await axios.post('/email-check', { email })

      if (success) {
        console.log(success, 'success')
        signIn('email',
          {
            callbackUrl: '/admin/dashboard',
            email
          })

        return
      }
    } catch (error) {
      console.log('email not found')
    }
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className="h-screen">
        <div className="flex items-center justify-center
          min-h-full
          py-12 px-4
          sm:px-6
          lg:px-8"
        >

          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="text-center text-3xl font-medium text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={sendLoginVerification}>

              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    onChange={ e => setEmail(e.target.value) }
                  />
                </div>

                <button
                  type="submit"
                  className="group rounded-b-md w-full admin-button"
                >
                  <span className="absolute left-0 inset-y-0 pl-3 admin-button__icon-wrapper">
                    <LockClosedIcon className="admin-button__icon" aria-hidden="true" />
                  </span>
                  Sign in
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default Login
