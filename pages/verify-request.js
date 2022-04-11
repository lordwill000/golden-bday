import Link from 'next/link'

const VerifyRequest = () => {
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center
        min-h-full
        py-12 px-4
        sm:px-6
        lg:px-8"
      >

      <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mb-8
              text-center text-3xl font-medium text-gray-900"
            >
              A sign in link has been sent to your email address
            </h2>
            <Link href='/'>
              <a>Go back to homepage</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyRequest
