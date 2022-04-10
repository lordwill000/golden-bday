const Admin = () => {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <form className="mt-6">
          <label htmlFor="email"
            className="block text-xs font-semibold text-gray-600 uppercase"
          >
            E-mail
          </label>

          <input id="email"
            type="email" name="email"
            placeholder="john.doe@company.com"
            autoComplete="email"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            required
          />

          <button type="submit"
          className="button">
            Log in
          </button>

        </form>
      </div>
    </div>
  )
}

export default Admin
