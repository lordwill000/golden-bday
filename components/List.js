const List = ({ title, items, parentClass, cols }) => {
  console.log(items)
  return (
    <div className={parentClass}>
      <div className="text-d2 font-script leading-[0.9] lg:leading-normal">{title}</div>
      <ol className={`pl-12 list-decimal ${cols ? 'columns-1 lg:columns-2 lg:gap-16' : 'columns-1'}`}>
        {
          items.map((item, i) => {
            return (
              <li key={i} className={i !== items.length - 1 ? 'mb-1' : ''}>{item}</li>
            )
          })
        }
      </ol>
    </div>
  )
}

export default List
