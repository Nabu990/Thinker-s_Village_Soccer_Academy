'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import {
  Home,
  Users,
  User,
  Calendar,
  Trophy,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Target,
  Activity,
  BarChart3,
  FileText,
  Clock,
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    ...(user?.role === 'MANAGER' ? [
      { name: 'Analytics', href: '/dashboard/manager/analytics', icon: BarChart3 },
      { name: 'Players', href: '/dashboard/manager/players', icon: Users },
      { name: 'Pending Players', href: '/dashboard/manager/pending-players', icon: Clock },
      { name: 'Coaches', href: '/dashboard/manager/coaches', icon: Shield },
      { name: 'Gallery', href: '/dashboard/manager/gallery', icon: Image },
      { name: 'Training', href: '/dashboard/manager/training', icon: Target },
      { name: 'Reports', href: '/dashboard/manager/reports', icon: FileText },
    ] : []),
    ...(user?.role === 'PLAYER' ? [
      { name: 'My Profile', href: '/dashboard/player/profile', icon: User },
      { name: 'Training', href: '/dashboard/player/training', icon: Target },
      { name: 'Schedule', href: '/dashboard/player/schedule', icon: Calendar },
      { name: 'Performance', href: '/dashboard/player/performance', icon: Activity },
    ] : []),
    ...(user?.role === 'COACH' ? [
      { name: 'Tactical Board', href: '/dashboard/coach', icon: Target },
      { name: 'Players', href: '/dashboard/coach/players', icon: Users },
      { name: 'Training', href: '/dashboard/coach/training', icon: Calendar },
      { name: 'Analytics', href: '/dashboard/coach/analytics', icon: BarChart3 },
    ] : []),
    ...(user?.role === 'FAN' ? [
      { name: 'Team Info', href: '/dashboard/fan/team', icon: Users },
      { name: 'Schedule', href: '/dashboard/fan/schedule', icon: Calendar },
      { name: 'Gallery', href: '/dashboard/fan/gallery', icon: Image },
      { name: 'News', href: '/dashboard/fan/news', icon: FileText },
    ] : []),
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <motion.div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <img src="/logo.png" alt="TVSA Academy Logo" className="w-8 h-8 rounded-lg" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-bold text-white">TVSA Academy</h1>
                <p className="text-xs text-emerald-100">Management Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/20"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User info */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white">
                <User className="w-6 h-6" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <Badge className="bg-emerald-100 text-emerald-800 text-xs border-0">
                  {user?.role}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`
                      group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <item.icon className={`w-5 h-5 mr-3 relative z-10 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-emerald-600'}`} />
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        className="absolute right-2 w-2 h-2 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-600 group"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0 overflow-hidden">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="flex-1">
                <motion.h1 
                  className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {title}
                </motion.h1>
                {subtitle && (
                  <motion.p 
                    className="text-sm text-gray-600 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {subtitle}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-0 hidden sm:flex">
                Thinker's Village Soccer Academy
              </Badge>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8 overflow-y-auto h-[calc(100vh-80px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
