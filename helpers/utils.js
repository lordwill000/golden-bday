export const randomizeTailwindColor = () => {
  const colors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red',
    'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
    'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia',
    'pink', 'rose']

  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  return `bg-${randomColor}-900 hover:bg-${randomColor}-900`
}
