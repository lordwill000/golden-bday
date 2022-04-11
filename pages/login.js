import Head from 'next/head'
import { LockClosedIcon } from '@heroicons/react/solid'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')

  const sendLoginVerification = e => {
    e.preventDefault()

    signIn('email', {
      callbackUrl: '/admin/dashboard',
      email
    })
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
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    onChange={ e => setEmail(e.target.value) }
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-b-md  text-white bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-amber-500 group-hover:text-amber-400" aria-hidden="true" />
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
