const Avatar = ({ otherClasses, name, profileBg }) => {
  const initials = name.split(' ').splice(0, 2).map(name => name[0]).join('')

  return (
    <div className={
      `flex items-center justify-center
      rounded-full h-10 w-10
      text-white text-xl
      ${profileBg}
      ${otherClasses}
    `}>
      {initials}
    </div>
  )
}

export default Avatar
