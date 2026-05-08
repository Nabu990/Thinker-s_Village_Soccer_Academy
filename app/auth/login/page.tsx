'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'fan'
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      login(data.user, data.token)
      toast.success('Login successful!')
      
      // Redirect based on role
      switch (data.user.role) {
        case 'MANAGER':
          router.push('/dashboard/manager')
          break
        case 'COACH':
          router.push('/dashboard/coach')
          break
        case 'PLAYER':
          router.push('/dashboard/player')
          break
        case 'FAN':
          router.push('/dashboard/fan')
          break
        default:
          router.push('/dashboard')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-300/10 to-teal-300/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl bg-white/90 backdrop-blur-sm border border-emerald-100">
          <CardHeader className="text-center pb-8">
            <motion.div 
              className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <img src="/logo.png" alt="TVSA Academy Logo" className="w-14 h-14 rounded-xl" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <CardTitle className="text-3xl font-bold text-gradient-emerald mb-2">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Sign in to your Thinker's Village Soccer Academy account
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="role" className="text-gray-700 font-medium text-left">I am a...</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="fan">Fan</option>
                  <option value="player">Player</option>
                  <option value="coach">Coach</option>
                  <option value="manager">Manager</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-gray-700 font-medium text-left">
                  {formData.role === 'fan' ? 'Email Address' : 'Email (any email works)'}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required={formData.role === 'fan'}
                  placeholder={formData.role === 'fan' ? 'Enter your email' : 'Enter any email'}
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="space-y-2"
              >
                <Label htmlFor="password" className="text-gray-700 font-medium text-left">
                  {formData.role === 'fan' ? 'Password' : formData.role === 'player' ? 'Password' : 'Admin Password'}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder={formData.role === 'fan' ? 'Enter your password' : formData.role === 'player' ? 'Enter your password' : 'Use admin123'}
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                />
                {formData.role === 'player' && (
                  <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                    ⚽ Players: Use the password you created during registration
                  </p>
                )}
                {formData.role !== 'fan' && formData.role !== 'player' && (
                  <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
                    💡 Admin access: Use password "admin123" for Manager/Coach access
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full btn-primary text-lg py-4 flex items-center justify-center shadow-lg hover:shadow-xl transform transition-all duration-300"
                      disabled={isLoading}
                    >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </motion.div>
            </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="mt-8 text-center"
            >
              {formData.role === 'fan' || formData.role === 'player' ? (
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/auth/register" className="text-gradient-emerald font-semibold hover:underline">
                    Sign up here
                  </Link>
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Manager/Coach accounts are created by administrators only
                </p>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
