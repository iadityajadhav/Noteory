import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Signup() {
  const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const { name, email, password } = signupInfo
    if (!name || !email || !password) return handleError('All fields are required')

    try {
      const response = await fetch('https://noteory-api.vercel.app/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      })

      const result = await response.json()
      const { success, message, error } = result

      if (success) {
        handleSuccess(message || 'Signup successful')
        setTimeout(() => navigate('/login'), 1000)
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
        <h1 className="text-3xl font-semibold text-cyan-400 text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your name..."
              value={signupInfo.name}
              className="w-full px-4 py-2 rounded bg-[#0f1f38] text-white outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm">Email</label>
            <input
              onChange={handleChange}
              type="text"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
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
              value={signupInfo.password}
              className="w-full px-4 py-2 rounded bg-[#0f1f38] text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#008b8b] hover:bg-[#00b4b4] py-2 rounded text-white font-medium"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00bcd4] font-semibold hover:underline">Login</Link>
        </p>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Signup
