import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import TextInput from '../components/ui/TextInput'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register submitted:', formData)
    // Send to backend here
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6 text-white">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Your name"
        />
        <TextInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
      <p className="text-sm text-gray-400 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-purple-400 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}
