import { PaperClipIcon, SaveIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import Layout from 'components/admin/AdminLayout'
import AdminRow from 'components/admin/AdminRow'

export default function Cms () {
  const [heroHeader, setHeroHeader] = useState('')
  const [heroName, setHeroName] = useState('')
  const [heroDate, setHeroDate] = useState(Date.now())

  const [details, setDetails] = useState([])

  const [rsvpHeader, setRsvpHeader] = useState('')
  const [rsvpCopy1, setRsvpCopy1] = useState('')
  const [rsvpCopy2, setRsvpCopy2] = useState('')

  return (
    <Layout>
      <div className="bg-slate-900 dark:bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-white dark:text-slate-900">
              Hero
            </h3>
            <button className='admin-button'>
              <span className="admin-button__icon-wrapper">
                <SaveIcon className="admin-button__icon" aria-hidden="true" />
              </span>
              Save changes
            </button>
          </div>

        </div>
        <div className="border-t border-gray-200">
          <dl>
            <AdminRow classes="bg-gray-50" label="Header">
              <textarea name="hero-header"
                className="admin-input rounded-md"
                placeholder="Join us"
                value={heroHeader}
                onChange={ e => setHeroHeader(e.target.value) }
              ></textarea>
            </AdminRow>

            <AdminRow classes="bg-whte" label="Name">
              <input name="heroHeader"
                type="text"
                className="admin-input rounded-md"
                placeholder="Divine Cabral Cuya"
                value={heroName}
                onChange={ e => setHeroName(e.target.value) }
              />
            </AdminRow>

            <AdminRow classes="bg-gray-50" label="Date">
              <DatePicker className='admin-input rounded-md'
                placeholderText="Select date"
                selected={heroDate}
                value={heroDate}
                onChange={(date) => setHeroDate(date)} />
            </AdminRow>
          </dl>
        </div>
      </div>
    </Layout>
  )
}
