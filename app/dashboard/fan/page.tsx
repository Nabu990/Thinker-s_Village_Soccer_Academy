'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Calendar,
  Trophy,
  Image,
  Heart,
  Eye,
  Clock,
  MapPin,
  Star,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

interface TeamInfo {
  totalPlayers: number
  activeCoaches: number
  upcomingMatches: number
  recentAchievements: string[]
}

interface Match {
  id: string
  team: string
  opponent: string
  date: string
  time: string
  venue: string
  isHome: boolean
}

interface GalleryItem {
  _id: string
  title: string
  imageUrl: string
  category: string
  date: string
  likes: number
  views: number
}

export default function FanDashboard() {
  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    totalPlayers: 0,
    activeCoaches: 0,
    upcomingMatches: 0,
    recentAchievements: []
  })
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([])
  const [recentGallery, setRecentGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFanData()
  }, [])

  const fetchFanData = async () => {
    try {
      setLoading(true)
      
      // Fetch team info
      const teamResponse = await fetch('/api/fan/team-info')
      const teamData = await teamResponse.json()
      if (teamResponse.ok) {
        setTeamInfo(teamData)
      }

      // Fetch upcoming matches
      const matchesResponse = await fetch('/api/fan/upcoming-matches')
      const matchesData = await matchesResponse.json()
      if (matchesResponse.ok) {
        setUpcomingMatches(matchesData.matches)
      }

      // Fetch recent gallery
      const galleryResponse = await fetch('/api/fan/recent-gallery')
      const galleryData = await galleryResponse.json()
      if (galleryResponse.ok) {
        setRecentGallery(galleryData.items)
      }
    } catch (error) {
      console.error('Error fetching fan data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'match': return 'bg-blue-100 text-blue-800'
      case 'training': return 'bg-green-100 text-green-800'
      case 'event': return 'bg-purple-100 text-purple-800'
      case 'award': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout 
      title="Fan Dashboard" 
      subtitle="Stay connected with Thinker's Village Soccer Academy"
    >
      <div className="w-full space-y-6">
        {/* Welcome Section */}
        <Card className="card bg-gradient-to-r from-primary-600 to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Welcome, TVSA Fan!</h1>
              <p className="text-lg opacity-90">
                Thank you for supporting Thinker's Village Soccer Academy. 
                Stay connected with our journey and celebrate our young talent.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Players
              </CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamInfo.totalPlayers}</div>
              <p className="text-xs text-gray-600 mt-1">Young athletes</p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Coaches
              </CardTitle>
              <Trophy className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamInfo.activeCoaches}</div>
              <p className="text-xs text-gray-600 mt-1">Dedicated staff</p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Upcoming Matches
              </CardTitle>
              <Calendar className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingMatches.length}</div>
              <p className="text-xs text-gray-600 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Recent Achievements
              </CardTitle>
              <Star className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamInfo.recentAchievements.length}</div>
              <p className="text-xs text-gray-600 mt-1">This season</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card hover:shadow-xl transition-shadow cursor-pointer">
            <Link href="/dashboard/fan/team">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Team Information</h3>
                <p className="text-sm text-gray-600">
                  Learn about our players, coaches, and teams
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="card hover:shadow-xl transition-shadow cursor-pointer">
            <Link href="/dashboard/fan/schedule">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Match Schedule</h3>
                <p className="text-sm text-gray-600">
                  View upcoming matches and training sessions
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="card hover:shadow-xl transition-shadow cursor-pointer">
            <Link href="/dashboard/fan/gallery">
              <CardContent className="p-6 text-center">
                <Image className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Photo Gallery</h3>
                <p className="text-sm text-gray-600">
                  Browse photos from matches, training, and events
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Achievements */}
        {teamInfo.recentAchievements.length > 0 && (
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-primary-600" />
                Recent Achievements
              </CardTitle>
              <CardDescription>
                Latest accomplishments from our academy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamInfo.recentAchievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center mb-2">
                      <Trophy className="w-5 h-5 text-yellow-600 mr-2" />
                      <h4 className="font-semibold text-sm">{achievement}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Matches */}
        {upcomingMatches.length > 0 && (
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                Upcoming Matches
              </CardTitle>
              <CardDescription>
                Don't miss our upcoming games
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMatches.slice(0, 3).map((match) => (
                  <div key={match.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {match.team} vs {match.opponent}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {match.time}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(match.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {match.venue}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={match.isHome ? 'default' : 'secondary'}>
                      {match.isHome ? 'Home' : 'Away'}
                    </Badge>
                  </div>
                ))}
              </div>
              {upcomingMatches.length > 3 && (
                <div className="text-center mt-4">
                  <Link href="/dashboard/fan/schedule">
                    <Button variant="outline">
                      View All Matches
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Recent Gallery */}
        {recentGallery.length > 0 && (
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="w-5 h-5 mr-2 text-primary-600" />
                Recent Photos
              </CardTitle>
              <CardDescription>
                Latest moments from our academy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentGallery.slice(0, 8).map((item) => (
                  <div key={item._id} className="group cursor-pointer">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-sm font-medium truncate">{item.title}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {recentGallery.length > 8 && (
                <div className="text-center mt-6">
                  <Link href="/dashboard/fan/gallery">
                    <Button variant="outline">
                      View All Photos
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
