import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white p-5">
      <h1 className="text-xl font-bold text-[#0284c7] dark:text-[#38bdf8]">TaskMaster</h1>  

      <div className="flex gap-5">
        <Link
         href='/register'
         className="bg-blue-500 text-white px-5 py-2 rounded-lg"
        >
            Sign Up
        </Link>

        <Link
         href='/login'
         className="bg-purple-600 text-white px-5 py-2 rounded-lg"
        >
            Sign In
        </Link>
      </div>
    </nav>
  )
}

export default Navbar