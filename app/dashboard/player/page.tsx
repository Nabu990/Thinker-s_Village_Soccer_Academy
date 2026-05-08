'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Target,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Activity,
  Heart,
  Star,
  Edit,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import Link from 'next/link'

interface PlayerProfile {
  _id: string
  jerseyNumber: number
  name: string
  email: string
  phoneNumber: string
  address: string
  position: string
  team: string
  status: string
  height: number
  weight: number
  preferredFoot: string
  skills: {
    speed: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
  }
  achievements: string[]
  joiningDate: string
  upcomingTraining: Array<{
    date: string
    time: string
    type: string
    coach: string
  }>
  upcomingMatches: Array<{
    date: string
    opponent: string
    venue: string
    isHome: boolean
  }>
  stats: {
    matchesPlayed: number
    goals: number
    assists: number
    minutesPlayed: number
    yellowCards: number
    redCards: number
  }
}

export default function PlayerDashboard() {
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlayerProfile()
  }, [])

  const fetchPlayerProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/player/profile')
      const data = await response.json()

      if (response.ok) {
        setPlayerProfile(data.profile)
      } else {
        console.error('Failed to fetch player profile:', data.error)
      }
    } catch (error) {
      console.error('Error fetching player profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'injured': return 'bg-red-100 text-red-800'
      case 'suspended': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPositionColor = (position: string) => {
    switch (position.toLowerCase()) {
      case 'goalkeeper': return 'bg-blue-100 text-blue-800'
      case 'defender': return 'bg-green-100 text-green-800'
      case 'midfielder': return 'bg-purple-100 text-purple-800'
      case 'forward': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSkillColor = (value: number) => {
    if (value >= 80) return 'bg-green-500'
    if (value >= 60) return 'bg-blue-500'
    if (value >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (loading) {
    return (
      <DashboardLayout title="Player Dashboard" subtitle="Loading your profile...">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your profile...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!playerProfile) {
    return (
      <DashboardLayout title="Player Dashboard" subtitle="Profile not found">
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Player profile not found</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Player Dashboard" 
      subtitle={`Welcome back, ${playerProfile.name}!`}
    >
      <div className="w-full space-y-6">
        {/* Player Profile Header */}
        <Card className="card bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{playerProfile.name}</h1>
                  <div className="flex items-center space-x-4">
                    <Badge className={getPositionColor(playerProfile.position)}>
                      {playerProfile.position}
                    </Badge>
                    <Badge variant="secondary">
                      #{playerProfile.jerseyNumber}
                    </Badge>
                    <Badge variant="secondary">
                      {playerProfile.team}
                    </Badge>
                    <Badge className={getStatusColor(playerProfile.status)}>
                      {playerProfile.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Member Since</p>
                <p className="text-lg font-semibold">
                  {new Date(playerProfile.joiningDate).toLocaleDateString()}
                </p>
                <p className="text-sm opacity-75 mt-1">
                  {playerProfile.height > 0 && playerProfile.weight > 0 
                    ? `${playerProfile.height}cm • ${playerProfile.weight}kg` 
                    : ''}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="text-sm font-medium">{playerProfile.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="text-sm font-medium">{playerProfile.phoneNumber || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-600">Address</p>
                  <p className="text-sm font-medium">{playerProfile.address || 'Not provided'}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Season Stats */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary-600" />
              Season Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-emerald-600">{playerProfile.stats.matchesPlayed}</p>
                <p className="text-xs text-gray-600 mt-1">Matches</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600">{playerProfile.stats.goals}</p>
                <p className="text-xs text-gray-600 mt-1">Goals</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-purple-600">{playerProfile.stats.assists}</p>
                <p className="text-xs text-gray-600 mt-1">Assists</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-orange-600">{playerProfile.stats.minutesPlayed}</p>
                <p className="text-xs text-gray-600 mt-1">Minutes</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-yellow-600">{playerProfile.stats.yellowCards}</p>
                <p className="text-xs text-gray-600 mt-1">Yellow Cards</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-red-600">{playerProfile.stats.redCards}</p>
                <p className="text-xs text-gray-600 mt-1">Red Cards</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card hover:shadow-xl transition-shadow cursor-pointer">
            <Link href="/dashboard/player/profile">
              <CardContent className="p-6 text-center">
                <User className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">My Profile</h3>
                <p className="text-sm text-gray-600">
                  View and update your personal information
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="card hover:shadow-xl transition-shadow cursor-pointer">
            <Link href="/dashboard/player/training">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Training</h3>
                <p className="text-sm text-gray-600">
                  View training schedule and progress
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="card hover:shadow-xl transition-shadow cursor-pointer">
            <Link href="/dashboard/player/schedule">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Schedule</h3>
                <p className="text-sm text-gray-600">
                  View upcoming matches and events
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Skills Assessment */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
              Skills Assessment
            </CardTitle>
            <CardDescription>
              Your current skill ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(playerProfile.skills).map(([skill, value]) => (
                <div key={skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium capitalize">{skill}</label>
                    <span className="text-sm font-bold">{value}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getSkillColor(value)}`}
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        {playerProfile.achievements.length > 0 && (
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-primary-600" />
                Achievements
              </CardTitle>
              <CardDescription>
                Your accomplishments and milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {playerProfile.achievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center mb-2">
                      <Star className="w-5 h-5 text-yellow-600 mr-2" />
                      <h4 className="font-semibold text-sm">{achievement}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Training Sessions */}
        {playerProfile.upcomingTraining.length > 0 && (
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary-600" />
                Upcoming Training Sessions
              </CardTitle>
              <CardDescription>
                Your scheduled training sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {playerProfile.upcomingTraining.slice(0, 3).map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{session.type}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {session.time}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(session.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      Coach: {session.coach}
                    </Badge>
                  </div>
                ))}
              </div>
              {playerProfile.upcomingTraining.length > 3 && (
                <div className="text-center mt-4">
                  <Link href="/dashboard/player/training">
                    <Button variant="outline">
                      View All Training
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Upcoming Matches */}
        {playerProfile.upcomingMatches.length > 0 && (
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary-600" />
                Upcoming Matches
              </CardTitle>
              <CardDescription>
                Matches you're scheduled to play
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {playerProfile.upcomingMatches.slice(0, 3).map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Activity className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {playerProfile.team} vs {match.opponent}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(match.date).toLocaleDateString()}
                          </span>
                          <span>{match.venue}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={match.isHome ? 'default' : 'secondary'}>
                      {match.isHome ? 'Home' : 'Away'}
                    </Badge>
                  </div>
                ))}
              </div>
              {playerProfile.upcomingMatches.length > 3 && (
                <div className="text-center mt-4">
                  <Link href="/dashboard/player/schedule">
                    <Button variant="outline">
                      View All Matches
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
