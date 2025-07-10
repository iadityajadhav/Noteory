import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = loginInfo
    if (!email || !password) return handleError('Email and password are required')

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo)
      })

      const result = await response.json()
      const { success, message, jwtToken, name, error } = result

      if (success) {
        handleSuccess(message || 'Login success')
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('loggedInUser', name)
        setTimeout(() => navigate('/home'), 1000)
      } else if (error) {
        handleError(error?.details?.[0]?.message || 'Something went wrong')
      } else {
        handleError(message)
      }
    } catch (err) {
      handleError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a192f] flex items-center justify-center px-4">
      <div className="bg-[#112240] w-full max-w-md p-8 rounded-lg shadow-xl text-white">
        <h1 className="text-3xl font-semibold text-cyan-400 text-center mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">Email</label>
            <input
              onChange={handleChange}
              type="text"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
              className="w-full px-4 py-2 rounded bg-[#0f1f38] text-white outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">Password</label>
            <input
              onChange={handleChange}
              type="text"
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
              className="w-full px-4 py-2 rounded bg-[#0f1f38] text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#008b8b] hover:bg-[#00b4b4] py-2 rounded text-white font-medium"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-[#00bcd4] font-semibold hover:underline">Signup</Link>
        </p>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Login
