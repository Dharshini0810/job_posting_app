import React from 'react'

const LoginCard = ({title,children}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default LoginCard
