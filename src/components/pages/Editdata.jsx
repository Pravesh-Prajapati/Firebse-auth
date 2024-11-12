import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Editdata() {
  let pos = useParams()
  const [hobbies, sethobbies] = useState([])

  let [user, setuser] = useState({})
  useEffect(() => {
    getuser()
  }, [])
  let getuser = () => {
    axios.get("http://localhost:3000/data/" + pos.id)
      .then((res) => {
        console.log(res.data);
        setuser(res.data)
      })
  }

  let setinput = (e) => {
    let { name, value } = e.target
    setuser({ ...user, [name]: value })

    if (name=="hobby") {
      // console.log(value);
      sethobbies([...hobbies,value])
    }
  }
  let submit = (e) => {
    console.log(pos);
    e.preventDefault()
    user={...user,"hobby":hobbies}
    axios.put("http://localhost:3000/data/" + pos.id, user)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          window.location = '/showdata'
        }
      })
    setuser({})
  }

  return (
    <>
      <div>
        <div className="container mx-auto">
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
                    <input type="checkbox" name='hobby' value={`${"singing" ? "singing" : []}`} onChange={(e) => { setinput(e) }} />
                  </div>
                  <div>
                    <span>Dancing</span>
                    <input type="checkbox" name='hobby' value={"dancing"} onChange={(e) => { setinput(e) }} />
                  </div>
                  <div>
                    <span>Eating</span>
                    <input type="checkbox" name='hobby' value={"eating"} onChange={(e) => { setinput(e) }} />
                  </div>
                </tr>
                <button className='bg-blue-600 px-3 mt-2 text-white rounded py-2' type='submit' >Update</button>
              </table>
            </form>
          </div>
        </div>
        {!user &&
          <div>
            <h1>No data</h1>
          </div>
        }
      </div>
    </>
  )
}

export default Editdata