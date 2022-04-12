import { Disclosure } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/outline'

import Layout from 'components/AdminLayout'

const Invitees = () => {
  return (
    <Layout>
      <>
        <section className='mb-6'>
          <Disclosure>
            {({ open }) => (
              <>
                <div className="flex justify-end">
                  <Disclosure.Button className="group admin-button">
                    <span className="admin-button__icon-wrapper">
                      <PlusIcon className="admin-button__icon" aria-hidden="true" />
                    </span>
                    Add invitee
                  </Disclosure.Button>
                </div>
              </>
            )}
          </Disclosure>
        </section>
      </>
    </Layout>
  )
}

export default Invitees
