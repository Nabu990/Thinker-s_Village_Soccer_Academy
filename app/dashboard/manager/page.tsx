'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Trophy, 
  Calendar, 
  Target, 
  TrendingUp, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Activity,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  UserPlus,
  ImagePlus,
  Settings
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface DashboardStats {
  totalPlayers: number
  activeCoaches: number
  upcomingMatches: number
  galleryItems: number
  totalRevenue: number
  activeTeams: number
  pendingApprovals: number
  trainingSessions: number
}

interface RecentPlayer {
  id: string
  name: string
  position: string
  team: string
  status: 'ACTIVE' | 'INJURED' | 'SUSPENDED' | 'TRANSFERRED'
  joiningDate: string
  profileImage?: string
}

interface RecentGallery {
  id: string
  title: string
  category: string
  date: string
  imageUrl: string
  featured: boolean
}

interface UpcomingMatch {
  id: string
  team: string
  opponent: string
  date: string
  time: string
  venue: string
  type: string
}

export default function ManagerDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPlayers: 0,
    activeCoaches: 0,
    upcomingMatches: 0,
    galleryItems: 0,
    totalRevenue: 0,
    activeTeams: 0,
    pendingApprovals: 0,
    trainingSessions: 0
  })

  const [recentPlayers, setRecentPlayers] = useState<RecentPlayer[]>([])
  const [recentGallery, setRecentGallery] = useState<RecentGallery[]>([])
  const [upcomingMatches, setUpcomingMatches] = useState<UpcomingMatch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch dashboard stats
      const statsResponse = await fetch('/api/dashboard/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch recent players
      const playersResponse = await fetch('/api/players?limit=5')
      if (playersResponse.ok) {
        const playersData = await playersResponse.json()
        setRecentPlayers(playersData.players || [])
      }

      // Fetch recent gallery items
      const galleryResponse = await fetch('/api/gallery?limit=5')
      if (galleryResponse.ok) {
        const galleryData = await galleryResponse.json()
        setRecentGallery(galleryData.items || [])
      }

      // Fetch upcoming matches (mock data for now)
      setUpcomingMatches([
        {
          id: '1',
          team: 'U-15',
          opponent: 'LISFA FC',
          date: '2024-01-20',
          time: '15:00',
          venue: 'Home Ground',
          type: 'League'
        },
        {
          id: '2',
          team: 'U-17',
          opponent: 'Paynesville FC',
          date: '2024-01-22',
          time: '10:00',
          venue: 'Away',
          type: 'Friendly'
        }
      ])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'injured': return 'bg-red-100 text-red-800'
      case 'suspended': return 'bg-yellow-100 text-yellow-800'
      case 'transferred': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <CheckCircle className="w-4 h-4" />
      case 'INJURED': return <AlertCircle className="w-4 h-4" />
      case 'SUSPENDED': return <XCircle className="w-4 h-4" />
      case 'TRANSFERRED': return <Users className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const mainStats = [
    {
      title: 'Total Players',
      value: stats.totalPlayers.toString(),
      change: '+12%',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Active Coaches',
      value: stats.activeCoaches.toString(),
      change: '+2',
      icon: Trophy,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Upcoming Matches',
      value: stats.upcomingMatches.toString(),
      change: 'This week',
      icon: Calendar,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Gallery Items',
      value: stats.galleryItems.toString(),
      change: '+23',
      icon: ImagePlus,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ]

  const secondaryStats = [
    {
      title: 'Monthly Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+8%',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Active Teams',
      value: stats.activeTeams.toString(),
      change: 'All active',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals.toString(),
      change: 'Action needed',
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Training Sessions',
      value: stats.trainingSessions.toString(),
      change: 'This week',
      icon: Activity,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      gradient: 'from-rose-500 to-red-500'
    }
  ]

  if (loading) {
    return (
      <DashboardLayout 
        title="Manager Dashboard" 
        subtitle="Loading your academy data..."
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto loading-skeleton"></div>
              <div className="h-3 bg-gray-200 rounded w-32 mx-auto loading-skeleton"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Manager Dashboard" 
      subtitle="Complete academy management and oversight"
    >
      <div className="w-full space-y-8">
        {/* Main Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {mainStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="card-glass hover:shadow-glow border-0 overflow-hidden group min-h-[140px]">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                  <CardTitle className="text-sm font-semibold text-gray-700">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"></div>
                    <p className="text-xs font-medium text-emerald-600 truncate">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {secondaryStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            >
              <Card className="card-glass hover:shadow-glow-teal border-0 overflow-hidden group min-h-[140px]">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                  <CardTitle className="text-sm font-semibold text-gray-700">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse flex-shrink-0"></div>
                    <p className="text-xs font-medium text-teal-600 truncate">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          <Card className="card-glass hover:shadow-glow border-0 overflow-hidden group min-h-[200px]">
            <CardHeader className="relative pb-4">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -mr-8 -mt-8"></div>
              <CardTitle className="flex items-center relative">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 mr-3 flex-shrink-0">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-gradient-emerald font-bold text-sm">Player Management</span>
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm pl-10">
                Manage player profiles and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 relative">
              <Link href="/dashboard/manager/players">
                <Button className="w-full btn-primary hover-lift text-sm py-2 flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Players
                </Button>
              </Link>
              <Link href="/dashboard/manager/players/add">
                <Button className="w-full btn-outline hover-lift text-sm py-2 flex items-center justify-center">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Player
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-glass hover:shadow-glow-teal border-0 overflow-hidden group min-h-[200px]">
            <CardHeader className="relative pb-4">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full -mr-8 -mt-8"></div>
              <CardTitle className="flex items-center relative">
                <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 mr-3 flex-shrink-0">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <span className="text-gradient-emerald font-bold text-sm">Coach Management</span>
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm pl-10">
                Manage coaching staff and schedules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 relative">
              <Link href="/dashboard/manager/coaches">
                <Button className="w-full btn-secondary hover-lift text-sm py-2 flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Coaches
                </Button>
              </Link>
              <Link href="/dashboard/manager/coaches/add">
                <Button className="w-full btn-outline hover-lift text-sm py-2 flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Coach
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-glass hover:shadow-glow border-0 overflow-hidden group min-h-[200px]">
            <CardHeader className="relative pb-4">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full -mr-8 -mt-8"></div>
              <CardTitle className="flex items-center relative">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 mr-3 flex-shrink-0">
                  <ImagePlus className="w-4 h-4 text-white" />
                </div>
                <span className="text-gradient-emerald font-bold text-sm">Gallery Management</span>
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm pl-10">
                Manage photos and media content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 relative">
              <Link href="/dashboard/manager/gallery">
                <Button className="w-full btn-primary hover-lift text-sm py-2 flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-2" />
                  View Gallery
                </Button>
              </Link>
              <Link href="/dashboard/manager/gallery/add">
                <Button className="w-full btn-outline hover-lift text-sm py-2 flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Photos
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity and Upcoming Matches */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6"
        >
          <Card className="card-glass hover:shadow-glow border-0 overflow-hidden">
            <CardHeader className="relative pb-4">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -mr-8 -mt-8"></div>
              <CardTitle className="text-gradient-emerald font-bold text-lg">Recent Players</CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                Latest player registrations and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPlayers.length > 0 ? (
                  recentPlayers.slice(0, 5).map((player) => (
                    <motion.div 
                      key={player.id} 
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg hover:from-emerald-100 hover:to-teal-100 transition-all duration-300 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform flex-shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-sm truncate">{player.name}</p>
                          <p className="text-xs text-gray-600 truncate">{player.position} • {player.team}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <Badge className={`${getStatusColor(player.status)} border-0 text-xs px-2 py-1`}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(player.status)}
                            <span className="text-xs">{player.status}</span>
                          </span>
                        </Badge>
                        <Button size="sm" variant="ghost" className="hover:bg-emerald-100 p-1">
                          <Edit className="w-3 h-3 text-emerald-600" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="font-medium text-sm">No recent players found</p>
                    <p className="text-xs">Check back later for new registrations</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="card-glass hover:shadow-glow-teal border-0 overflow-hidden">
            <CardHeader className="relative pb-4">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full -mr-8 -mt-8"></div>
              <CardTitle className="text-gradient-emerald font-bold text-lg">Recent Gallery Items</CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                Latest photo uploads and media additions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentGallery.length > 0 ? (
                  recentGallery.slice(0, 5).map((item) => (
                    <motion.div 
                      key={item.id} 
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform flex-shrink-0">
                          <ImagePlus className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-sm truncate">{item.title}</p>
                          <p className="text-xs text-gray-600 truncate">{item.category} • {new Date(item.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        {item.featured && (
                          <Badge className="badge-warning border-0 text-xs px-2 py-1">
                            Featured
                          </Badge>
                        )}
                        <Button size="sm" variant="ghost" className="hover:bg-indigo-100 p-1">
                          <Edit className="w-3 h-3 text-indigo-600" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:bg-red-100 p-1">
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <ImagePlus className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="font-medium text-sm">No recent gallery items found</p>
                    <p className="text-xs">Start adding photos to showcase academy moments</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="card-glass hover:shadow-glow border-0 overflow-hidden">
            <CardHeader className="relative pb-4">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full -mr-8 -mt-8"></div>
              <CardTitle className="text-gradient-emerald font-bold text-lg">Upcoming Matches</CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                Scheduled matches and fixtures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMatches.length > 0 ? (
                  upcomingMatches.map((match) => (
                    <motion.div 
                      key={match.id} 
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg hover:from-cyan-100 hover:to-blue-100 transition-all duration-300 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform flex-shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-sm truncate">{match.team} vs {match.opponent}</p>
                          <p className="text-xs text-gray-600 truncate">{match.date} • {match.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <Badge className="badge-primary border-0 text-xs px-2 py-1">
                          {match.type}
                        </Badge>
                        <Button size="sm" variant="ghost" className="hover:bg-cyan-100 p-1">
                          <Settings className="w-3 h-3 text-cyan-600" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="font-medium text-sm">No upcoming matches scheduled</p>
                    <p className="text-xs">Check back soon for match fixtures</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
