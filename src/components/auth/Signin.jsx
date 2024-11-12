import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, Provider } from '../../Firebase-config'
import { toast } from 'react-toastify'
import { GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Signin() {
    let [user, setuser] = useState({})
    let navigate= useNavigate()
    let setinput = (e) => {
        let { name, value } = e.target
        setuser({ ...user, [name]: value })
    }
    let submit = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((res) => {
                toast.success("Login Success")
                localStorage.setItem("loginuser",JSON.stringify(res.user.uid))||""
                // console.log(res.user.email);
                // console.log(res.user.uid);
                setTimeout(() => {
                    window.location = '/'
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Invalid Emaail Or passsword")
                // toast.error(err)
            })
    }
    useEffect(() => {
        let getlogin=JSON.parse(localStorage.getItem("loginuser"))
        if (getlogin) {
            window.location="/"
        }
    }, [])

    let handleClick = () =>{
        signInWithPopup(auth, Provider)
        .then((res)=>{
            console.log(res.user);
            setTimeout(() => {
                navigate("/");
            }, 2000);
           
        })
        .catch((err)=>{
          console.log(err);
        })
    }
    
    
    return (
        <>
            <div>
                <div classNameName="container mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-8 w-full mx-auto my-16 max-w-md">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-6">LogIn</h2>
                        <form method='post' onSubmit={(e) => { submit(e) }}>
                            <div className="mb-4">
                                <label for="email" className="block text-sm font-medium text-gray-600">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={(e) => { setinput(e) }} />
                            </div>
                            <div className="mb-6">
                                <label for="password" className="block text-sm font-medium text-gray-600">Password</label>
                                <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={(e) => { setinput(e) }} />
                            </div>
                            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign In</button>
                        </form>
                        <button className='bg-blue-600 mt-4 p-2 text-white rounded-md hover:bg-blue-700 text-center mx-auto' onClick={()=>handleClick()}>Sign In with google</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin