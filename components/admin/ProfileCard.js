import Link from 'next/link'

import Avatar from './Avatar'

export default function ProfileCard ({
  user: { _id, name, rsvp, profileBg, slug, email },
  children
}) {
  const rsvpColor = (rsvp) => {
    switch (rsvp) {
      case 'no':
        return 'text-rose-600'
      case 'not-yet':
        return 'text-neutral-600'
      default:
        return 'text-lime-600'
    }
  }

  function renderContents () {
    return (
      <>
        <p>{name}</p>
        {
          rsvp
            ? (
              <p>
                <small>RSVP: &nbsp;
                  <span className={rsvpColor(rsvp)}>
                    {rsvp.replace('-', ' ').toUpperCase()}
                  </span>
                </small>
              </p>
              )
            : <small>{email}</small>
        }

      </>
    )
  }
  return (
    <div key={_id} className="flex items-center gap-3 p-3
      border border-slate-900 dark:border-white rounded-md transition
      bg-slate-900 dark:bg-white
      hover:bg-slate-200 dark:hover:bg-slate-900
      text-white dark:text-slate-900
      hover:text-slate-900 dark:hover:text-white"
    >
      <Avatar otherClasses="shrink-0" name={name} profileBg={profileBg}/>
      {
        slug
          ? (
          <Link href={`/admin/invitees/${slug}`} passHref>
            <a className='grow'>
              {renderContents()}
            </a>
          </Link>
            )
          : (
            <div className="grow">
              {renderContents()}
            </div>
            )
      }

      {children}
    </div>
  )
}
