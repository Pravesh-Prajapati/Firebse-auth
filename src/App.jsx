import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Signup from "./components/auth/Signup"
import Signin from "./components/auth/Signin"
import Showdata from "./components/pages/Showdata"
import Editdata from "./components/pages/Editdata"

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/showdata" element={<Showdata/>} />
      <Route path="/editdata/:id" element={<Editdata/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
