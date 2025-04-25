import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white dark:bg-gray-800 p-5">
      <h1 className="text-xl font-bold text-[#0284c7] dark:text-[#38bdf8]">TaskMaster</h1>  

      <div className="flex gap-1 md:gap-5">
        <Link
         href='/register'
         className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-5 text-sm py-2 rounded-lg"
        >
            Sign Up
        </Link>

        <Link
         href='/login'
         className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-5 text-sm py-2 rounded-lg"
        >
            Sign In
        </Link>
      </div>
    </nav>
  )
}

export default Navbar