import AdminHeader from 'components/admin/AdminHeader'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function Layout ({ children }) {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    const path = router.pathname

    const formatted = path.split('/')[2]

    setCurrentPage(formatted.toUpperCase())
  }, [currentPage, router])

  const { status } = useSession({
    required: true,
    onUnauthenticated () {
      router.push('/api/auth/signin')
    }
  })

  if (status === 'loading') {
    return (
      <div className="h-full flex ">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    )
  }

  return (
    <>
      <AdminHeader page={currentPage}/>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-3">
              { children }
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
