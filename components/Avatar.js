const Avatar = ({ name }) => {
  const initials = name.split(' ').splice(0, 2).map(name => name[0]).join('')

  return (
    <div className={
      `flex items-center justify-center
      rounded-full h-10 w-10
      bg-slate-700 text-white text-xl
      hover:bg-slate-900
    `}>
      {initials}
    </div>
  )
}

export default Avatar
