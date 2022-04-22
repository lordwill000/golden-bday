import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

import AdminHeader from 'components/admin/AdminHeader'
import Loader from 'components/Loader'

function Layout ({ children }) {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState('')

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated () {
      router.push('/api/auth/signin')
    }
  })

  useEffect(() => {
    const path = router.pathname

    const formatted = path.split('/')[2]

    setCurrentPage(formatted.toUpperCase())
  }, [currentPage, router])

  useEffect(() => {
    if (status === 'authenticated') {
      document.querySelector('html').classList.add(session.theme)
    }
  }, [status, session])

  if (status === 'loading') {
    return (
      <div className="h-full flex ">
        <Loader colorClass="text-accent" />
      </div>
    )
  }

  return (
    <div className='h-screen'>
      <AdminHeader page={currentPage} user={session}/>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-3">
              { children }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout
