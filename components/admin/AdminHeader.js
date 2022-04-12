import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, LogoutIcon } from '@heroicons/react/outline'
import { signOut } from 'next-auth/react'

import ActiveLink from 'components/ActiveLink'
import Avatar from 'components/Avatar'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard'
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

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

const AdminHeader = ({ page, user }) => {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-amber-800">
          {({ open }) => (
            <>
              <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex items-center md:justify-between h-16">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <ActiveLink
                            key={item.name}
                            activeClassName="bg-amber-900 text-white"
                            href={ item.href }
                          >
                            <a className="text-amber-300 hover:bg-amber-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                              {item.name}
                            </a>
                          </ActiveLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex">
                    <div className="mr-4 flex items-center">
                      <Avatar name={user.name}/>
                    </div>

                    <a className="text-amber-300 hover:bg-amber-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </a>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-amber-800 inline-flex items-center justify-center p-2 rounded-md text-amber-400 hover:text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amber-800 focus:ring-white">
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
                  {navigation.map((item) => (
                    <ActiveLink
                      key={item.name}
                      activeClassName="bg-amber-900 text-white"
                      href={ item.href }
                    >
                      <a className="block text-amber-300 hover:bg-amber-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        {item.name}
                      </a>
                    </ActiveLink>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-amber-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {/* <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" /> */}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-amber-400">lordwill.mabalot@gmail.com</div>
                    </div>

                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-amber-400 hover:text-white hover:bg-amber-700"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                    <a className="block px-3 py-2 rounded-md text-base font-medium text-amber-400 hover:text-white hover:bg-amber-700"
                      onClick={() => signOut()}
                    >Sign out</a>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-screen-xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-amber-900">
              {page}
            </h1>
          </div>
        </header>
      </div>
    </>
  )
}

export default AdminHeader
