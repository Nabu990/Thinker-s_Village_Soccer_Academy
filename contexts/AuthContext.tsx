'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface AuthUser {
  id: string
  email: string
  name: string
  role: 'MANAGER' | 'FAN' | 'PLAYER' | 'COACH'
  profileImage?: string
  phoneNumber?: string
  address?: string
  dateOfBirth?: Date
}

interface AuthContextType {
  user: AuthUser | null
  token: string | null
  login: (user: AuthUser, token: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setToken(savedToken)
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (user: AuthUser, token: string) => {
    setUser(user)
    setToken(token)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
