const AdminRow = ({ label, children, classes }) => {
  return (
    <div className={`${classes} bg-gray-50 p-4 grid grid-cols-1 sm:grid-cols-4 sm:gap-3`}>
      <dt className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="mt-3 sm:mt-0 sm:col-span-3">
        {children}
      </dd>
    </div>
  )
}

export default AdminRow
