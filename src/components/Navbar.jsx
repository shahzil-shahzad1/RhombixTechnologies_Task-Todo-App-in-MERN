import React from 'react'
const Navbar = () => {
  return (
    <nav className='flex justify-between text-white bg-indigo-900 py-4'>
      <div className='flex items-center justify-center mx-4 gap-2'>
        <img className="logo" width={30} src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg" alt="" />
        <span className='font-bold text-xl cursor-pointer'>fTask</span>

        </div>
        <ul className="flex mx-9 gap-8">
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
