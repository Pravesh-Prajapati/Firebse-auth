import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { json, Link } from 'react-router-dom'

function Showdata() {
    const [list, setlist] = useState([])
    let id= JSON.parse(localStorage.getItem("loginuser"))
    // console.log(id);

    useEffect(() => {
        getdata()
    }, [])
    let getdata = () => {
        axios.get("http://localhost:3000/data/?UID="+id)
            .then((res) => {
                console.log(res.data);
                setlist(res.data)
            })
    }
    let remove = (val, pos) => {
        axios.delete("http://localhost:3000/data/" + val.id)
        let newlist = list.filter((val, i) => {
            return i != pos
        })
        setlist(newlist)
    }


    return (
        <>
            <div>
                <div classNameName="container mx-auto">
                    <table className='border' align='center' border={1}>
                        <tr>
                            <th>Email</th>
                            <th>password</th>
                            <th>tasks</th>
                            <th>Action</th>
                        </tr>
                        
                        {list.map((val, i) => {
                            console.log(val.hobby);
                            
                            return (
                                <>
                                    <tr key={i}>
                                        <td>{val.email}</td>
                                        <td>{val.password}</td>
                                        <td>{val.hobby[0]}  {val.hobby[1]}</td>
                                        <td>
                                            <button className='bg-red-600 px-3 mt-2 text-white rounded py-2 mx-1' onClick={() => { remove(val, i) }}>Delete</button>
                                            <Link to={"/editdata/" + val.id} className='bg-blue-600 px-3 mt-2 text-white rounded py-2'>Update</Link>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                        }
                    </table>
                </div>
            </div>
        </>
    )
}

export default Showdata