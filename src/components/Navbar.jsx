import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Firebase-config'
import { toast } from 'react-toastify'

function Navbar() {
    const [user, setuser] = useState("")
    useEffect(() => {
        let getuser = JSON.parse(localStorage.getItem("loginuser"))||""
        // console.log(getuser);
        setuser(getuser)
    }, [])
    let signout=()=>{
      auth.signOut();
      window.location="/signin"
      localStorage.setItem("loginuser",JSON.stringify(""))
      toast.success("signout success")
    }

    return (
        <header>
            <div className="container mx-auto">
                <div className='flex justify-between py-3'>
                    <nav>
                        <ul className='flex gap-7 font-semibold'>
                            <li>
                                <Link to={'/'} >Home</Link>
                            </li>
                            <li>
                                <a href='#'>About</a>
                            </li>
                            <li>
                                <a href='#'>Contact</a>
                            </li>
                        </ul>
                    </nav>
                    <h1>{user}</h1>
                    <div className='flex gap-4 font-semibold'>
                       
                        {user ?
                            <button onClick={()=>{signout()}}>Sign Out</button>
                            :
                            <>
                                <Link to={"/signin"} className='px-4 py-2'> Sign In</Link>
                                <Link to={"/signup"} className='text-white rounded hover:text-indigo-500 px-4 py-2 bg-indigo-600 ' >Sign Up</Link>
                            </>
                        }
                         {/* <Link to={"/signin"} className='px-4 py-2'> Sign In</Link>
                         <Link to={"/signup"} className='text-white rounded hover:text-indigo-500 px-4 py-2 bg-indigo-600 ' >Sign Up</Link> */}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar