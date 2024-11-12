import React, { useEffect, useState } from 'react'
import { auth } from '../Firebase-config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import { auth } from '../Firebase-config'


function Home() {
  // auth.onAuthStateChanged(user)
  let [list, setlist] = useState([])
  let [data, setdata] = useState()
  let [user, setuser] = useState({})
  let [hobbies, sethobbies] = useState([])
  let navigate=useNavigate()

  useEffect(() => {
    let getdata = JSON.parse(localStorage.getItem("loginuser"))
    // console.log(getdata);
    setdata(getdata)
    // if (!getdata) {
    //   console.log(getdata);
    //   window.location = "/signin"
    // }
  }, [])

  // auth.onAuthStateChanged((user) => {
  //   if (user) {
  //     console.log(user.id);
  //   }
  // })


  let setinput = (e) => {
    let { name, value } = e.target
    setuser({ ...user, [name]: value })
    if (name=="hobby") {
      // console.log(value);
      sethobbies([...hobbies,value])
    }
    // console.log(value);
    // sethobbies([])
  }

  

  let submit = async (e) => {
    e.preventDefault()
    // console.log(hobbies);
    user={...user,"hobby":hobbies}
    let loginuser = { ...user, "UID": data }
      console.log(loginuser);
      await axios.post("http://localhost:3000/data/", loginuser)
      console.log(data);
      toast.success("Success")
      setTimeout(() => {
        navigate("/showdata")
      }, 1000);
    setuser({})
    sethobbies([])
    // console.log(hobbies); 
  }
    
  console.log(hobbies);
  

  return (
    <div>
      <div classNameName="container mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 w-full mx-auto my-16 max-w-md">
          <Link className='mx-auto text-blue-600' to={"/showdata"} >Show data</Link>
          <form action="" onSubmit={(e) => { submit(e) }} >
            <table border={1}  >
              <tr>
                <td>
                  <label for="email" className="block text-sm font-medium text-gray-600">Enter email </label>
                  <input type="email" name="email" value={user.email ? user.email : ""} className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={(e) => { setinput(e) }} />
                </td>
                <td>
                  <label for="password" className="block text-sm font-medium text-gray-600"> Enter Password</label>
                  <input type="password" value={user.password ? user.password : ""} name="password" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={(e) => { setinput(e) }} />
                </td>
              </tr>
              <tr>
                <span>select hobby</span>
                <div>
                  <span>singing</span>
                  <input type="checkbox" name='hobby' value={"singing"}  onChange={(e) => { setinput(e) }} />
                </div>
                <div>
                <span>Dancing</span>
                  <input type="checkbox" name='hobby' value={"dancing"} onChange={(e) => { setinput(e) }} />
                </div>
                <div>
                <span>Eating</span>
                  <input type="checkbox" name='hobby'  value={"eating"} onChange={(e) => { setinput(e) }} />
                </div>
              </tr>
              <button className='bg-blue-600 px-3 mt-2 text-white rounded py-2' type='submit' >submit</button>
            </table>
          </form>
        </div>
        <table className='border' align='center' border={1}>
          <tr>
            <th>Email</th>
            <th>password</th>
            <th>Action</th>
          </tr>
          {/* {list.map((val, i) => {
            return (
              <>
                <tr key={i}>
                  <td>{val.email}</td>
                  <td>{val.password}</td>
                  <td>
                    <button className='bg-red-600 px-3 mt-2 text-white rounded py-2 mx-1' onClick={() => { remove(val, i) }}>Delete</button>
                    <button className='bg-blue-600 px-3 mt-2 text-white rounded py-2' onClick={() => { updatedata(val, i) }}>Update</button>
                  </td>
                </tr>
              </>
            )
          })
          } */}
        </table>
      </div>
    </div>
  )
}

export default Home