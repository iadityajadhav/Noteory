import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex items-center justify-center px-4">
      <div className="max-w-3xl bg-[#112240] p-10 rounded-2xl shadow-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">Welcome to Noteory</h1>
        <p className="text-gray-300 text-lg md:text-xl mb-6">
          Your personal space to write, save, and organize notes — securely and simply.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/login"
            className="bg-[#008b8b] hover:bg-[#00b4b4] px-6 py-3 text-white font-medium rounded-lg transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-[#008b8b] hover:bg-gray-200 px-6 py-3 font-medium rounded-lg transition"
          >
            Signup
          </Link>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          &copy; 2025 Noteory. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default LandingPage
