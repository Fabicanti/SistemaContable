import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { Home } from "./components/Home"
import { HomePage } from "./components/HomePage"

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
        </Routes>
      </Router>
    </>
  )
}