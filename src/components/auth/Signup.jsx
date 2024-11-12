import React, { useEffect, useState } from 'react'
import { auth } from '../../Firebase-config';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup() {
    let [userdata, setuserdata] = useState({})
    let setinput = (e) => {
        let { name, value } = e.target;
        setuserdata({ ...userdata, [name]: value })
    }
    let submit = (e) => {
        e.preventDefault()
        // console.log(userdata);
        if (userdata.password == userdata.confirmpassword) {
            createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
                .then((res) => {
                    // console.log(res);
                    toast.success("Register success")
                    setTimeout(() => {
                        window.location="/signin"
                    }, 1000);
                })
                .catch((err)=>{
                    toast.error("Email Already eists")    
                })
            // toast.success("Register success")
        }
        else {
            toast.error("Password Must Be same")
        }
    }
    useEffect(() => {
        let getlogin=JSON.parse(localStorage.getItem("loginuser"))
        if (getlogin) {
            window.location="/"
        }
    }, [])


    return (
        <>

            <div>
                <div classNameName="container mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-8 w-full mx-auto my-16 max-w-md">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Create an Account</h2>
                        <form method='post' onSubmit={(e) => { submit(e) }}>
                            <div className="mb-4">
                                <label for="name" className="block text-sm font-medium text-gray-600">Name</label>
                                <input type="text" id="name" name="name" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={(e) => { setinput(e) }} />
                            </div>
                            <div className="mb-4">
                                <label for="email" className="block text-sm font-medium text-gray-600">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={(e) => { setinput(e) }} />
                            </div>
                            <div className="mb-6">
                                <label for="password" className="block text-sm font-medium text-gray-600">Password</label>
                                <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={(e) => { setinput(e) }} />
                            </div>
                            <div className="mb-6">
                                <label for="password" className="block text-sm font-medium text-gray-600">Confirm Password</label>
                                <input type="password" id="cpassword" name="confirmpassword" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={(e) => { setinput(e) }} />
                            </div>
                            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Signup