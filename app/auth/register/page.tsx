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

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    role: 'fan',
    // Player specific fields
    jerseyNumber: '',
    position: 'forward',
    height: '',
    weight: '',
    preferredFoot: 'right'
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: formData.role,
          dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
          // Only include player fields if role is player
          ...(formData.role === 'player' && {
            jerseyNumber: parseInt(formData.jerseyNumber),
            position: formData.position,
            height: formData.height ? parseInt(formData.height) : undefined,
            weight: formData.weight ? parseInt(formData.weight) : undefined,
            preferredFoot: formData.preferredFoot
          })
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Don't login immediately - show approval message for players
      if (data.user.role === 'PLAYER') {
        toast.success('Registration submitted! Your account is pending manager approval.')
        router.push('/auth/pending-approval')
      } else {
        login(data.user, data.token)
        toast.success('Registration successful!')
        
        // Redirect based on role
        switch (data.user.role) {
          case 'MANAGER':
            router.push('/dashboard/manager')
            break
          case 'FAN':
            router.push('/dashboard/fan')
            break
          default:
            router.push('/dashboard')
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed')
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 py-8 relative overflow-hidden">
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
        className="w-full max-w-2xl relative z-10"
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
                Join TVSA Academy
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Create your account to join Thinker's Village Soccer Academy
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium text-left">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium text-left">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-700 font-medium text-left">I want to register as...</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="fan">Fan</option>
                  <option value="player">Player</option>
                </select>
              </div>

              {/* Role-specific notices */}
              {formData.role === 'fan' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>🎯 Fan Registration</strong><br/>
                    Register as a fan to follow the academy, view matches, and stay updated with team news.
                  </p>
                </div>
              )}

              {formData.role === 'player' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800">
                    <strong>⚽ Player Registration</strong><br/>
                    Register as a player to join the academy. Your registration will require manager approval before you can access the dashboard.
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium text-left">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-left">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-700 font-medium text-left">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-700 font-medium text-left">Address</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium text-left">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              {/* Player-specific fields */}
              {formData.role === 'player' && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Player Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jerseyNumber" className="text-gray-700 font-medium text-left">Jersey Number *</Label>
                      <Input
                        id="jerseyNumber"
                        name="jerseyNumber"
                        type="number"
                        min="1"
                        max="99"
                        required={formData.role === 'player'}
                        placeholder="Enter jersey number"
                        value={formData.jerseyNumber}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-gray-700 font-medium text-left">Position *</Label>
                      <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required={formData.role === 'player'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="forward">Forward</option>
                        <option value="midfielder">Midfielder</option>
                        <option value="defender">Defender</option>
                        <option value="goalkeeper">Goalkeeper</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height" className="text-gray-700 font-medium text-left">Height (cm)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        min="100"
                        max="250"
                        placeholder="Enter height in cm"
                        value={formData.height}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-gray-700 font-medium text-left">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        min="30"
                        max="150"
                        placeholder="Enter weight in kg"
                        value={formData.weight}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredFoot" className="text-gray-700 font-medium text-left">Preferred Foot</Label>
                      <select
                        id="preferredFoot"
                        name="preferredFoot"
                        value={formData.preferredFoot}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="right">Right</option>
                        <option value="left">Left</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

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
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
              </motion.div>
              
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href="/auth/login" 
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-block transform transition-all duration-300 hover:scale-105"
                  >
                    Already have an account? Sign in
                  </Link>
                </motion.div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
