import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/noteory"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/noteory' element={<LandingPage/>}/>
      </Routes>
    </>
  )
}

export default App
