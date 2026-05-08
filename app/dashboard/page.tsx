'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Trophy, Calendar, Target, TrendingUp, Star } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'MANAGER':
          router.push('/dashboard/manager')
          break
        case 'PLAYER':
          router.push('/dashboard/player')
          break
        case 'COACH':
          router.push('/dashboard/coach')
          break
        case 'FAN':
          router.push('/dashboard/fan')
          break
        default:
          router.push('/dashboard')
      }
    }
  }, [user, router])

  if (!user) {
    return <div>Loading...</div>
  }

  const stats = [
    {
      title: 'Total Players',
      value: '45',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Coaches',
      value: '8',
      change: '+2',
      icon: Trophy,
      color: 'text-green-600'
    },
    {
      title: 'Upcoming Matches',
      value: '3',
      change: 'This week',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Training Sessions',
      value: '24',
      change: 'This month',
      icon: Target,
      color: 'text-orange-600'
    }
  ]

  return (
    <DashboardLayout 
      title="Welcome to TVSA Academy" 
      subtitle="Your comprehensive soccer academy management portal"
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="text-green-600">{stat.change}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest updates from the academy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">New player registration</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <Badge variant="secondary">Player</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">Training session scheduled</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <Badge variant="secondary">Training</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">Match victory celebration</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <Badge variant="secondary">Match</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-primary-600" />
                Academy Highlights
              </CardTitle>
              <CardDescription>
                Recent achievements and milestones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                  <h4 className="font-semibold">U-15 Tournament Champions</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Our U-15 team secured first place in the regional tournament
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-green-500 mr-2" />
                  <h4 className="font-semibold">50+ Young Players</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Growing community of talented young athletes
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role-specific quick actions */}
        <Card className="card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks based on your role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user.role === 'manager' && (
                <>
                  <Link href="/dashboard/manager/players">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Players
                    </Button>
                  </Link>
                  <Link href="/dashboard/manager/gallery">
                    <Button className="w-full justify-start" variant="outline">
                      <Trophy className="w-4 h-4 mr-2" />
                      Update Gallery
                    </Button>
                  </Link>
                  <Link href="/dashboard/manager/coaches">
                    <Button className="w-full justify-start" variant="outline">
                      <Target className="w-4 h-4 mr-2" />
                      Coach Management
                    </Button>
                  </Link>
                </>
              )}
              {user.role === 'player' && (
                <>
                  <Link href="/dashboard/player/profile">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </Link>
                  <Link href="/dashboard/player/training">
                    <Button className="w-full justify-start" variant="outline">
                      <Target className="w-4 h-4 mr-2" />
                      Training Schedule
                    </Button>
                  </Link>
                  <Link href="/dashboard/player/schedule">
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Match Schedule
                    </Button>
                  </Link>
                </>
              )}
              {user.role === 'fan' && (
                <>
                  <Link href="/dashboard/fan/team">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Team Information
                    </Button>
                  </Link>
                  <Link href="/dashboard/fan/gallery">
                    <Button className="w-full justify-start" variant="outline">
                      <Trophy className="w-4 h-4 mr-2" />
                      View Gallery
                    </Button>
                  </Link>
                  <Link href="/dashboard/fan/schedule">
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Match Schedule
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
