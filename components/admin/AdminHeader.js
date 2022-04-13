import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, LogoutIcon } from '@heroicons/react/outline'
import { signOut } from 'next-auth/react'

// import ActiveLink from 'components/ActiveLink'
import Link from 'next/link'
import Avatar from 'components/Avatar'

const navigation = [
  {
    name: 'CMS',
    href: '/admin/cms'
  },
  {
    name: 'Users',
    href: '/admin/users'
  },
  {
    name: 'Invitees',
    href: '/admin/invitees'
  }
]

const userNavigation = [
  {
    name: 'Your Profile',
    href: '/admin/me'
  }
]

const AdminHeader = ({ page, user }) => {
  return (
    <>
      <Disclosure as="nav" className="bg-white dark:bg-slate-900">
        {({ open }) => (
          <>
            <div className="max-w-screen-xl mx-auto px-4">
              <div className="flex items-center md:justify-between h-16">
                <div className="flex items-center">
                  <div className="hidden md:block">
                    <div className="flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a className={
                            `px-3 py-2 rounded-md text-sm font-medium ${page.toLowerCase() === item.name.toLowerCase()
                              ? 'text-white dark:text-slate-900 bg-slate-900 dark:bg-white hover:text-slate-900 hover:bg-slate-200 dark:hover:bg-slate-200'
                              : 'text-slate-900 dark:text-white hover:text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900'}`
                            }
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex">
                  <div className="mr-4 flex items-center">
                    <Avatar name={user.name} />
                  </div>

                  <a className="px-3 py-2 rounded-md text-sm font-medium text-slate-900 dark:text-white hover:text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </a>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-slate-900 dark:bg-white inline-flex items-center justify-center p-2 rounded-md text-white dark:text-slate-900 hover:text-white dark:hover:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open
                      ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                        )
                      : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {
                navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a className={
                      `block px-3 py-2 rounded-md text-sm font-medium ${page.toLowerCase() === item.name.toLowerCase()
                        ? 'text-white dark:text-slate-900 bg-slate-900 dark:bg-white hover:text-slate-900 hover:bg-slate-200 dark:hover:bg-slate-200'
                        : 'text-slate-900 dark:text-white hover:text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900'}`
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-slate-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Avatar name={user.name} />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-slate-500">{user.name}</div>
                    <div className="text-sm font-medium leading-none text-slate-400">{user.email}</div>
                  </div>

                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-slate-900 dark:text-white hover:text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <a className="block px-3 py-2 rounded-md text-sm font-medium text-slate-900 dark:text-white hover:text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 cursor-pointer"
                    onClick={() => signOut()}
                  >Sign out</a>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white dark:bg-gray-900 border-b border-slate-900 dark:border-white">
        <div className="max-w-screen-xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            {page}
          </h1>
        </div>
      </header>
    </>
  )
}

export default AdminHeader
