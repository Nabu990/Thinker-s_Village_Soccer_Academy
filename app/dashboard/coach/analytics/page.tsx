'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp,
  Users,
  Target,
  Trophy,
  Activity,
  Calendar,
  BarChart3,
  LineChart,
  PieChart
} from 'lucide-react'

interface PlayerStats {
  id: string
  name: string
  jerseyNumber: number
  position: string
  matchesPlayed: number
  goals: number
  assists: number
  minutesPlayed: number
  passAccuracy: number
  tackles: number
  rating: number
}

interface TeamStats {
  totalMatches: number
  wins: number
  draws: number
  losses: number
  goalsScored: number
  goalsConceded: number
  cleanSheets: number
}

export default function CoachAnalyticsPage() {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([])
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('season')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      
      // Mock data for player stats
      const mockPlayerStats: PlayerStats[] = [
        {
          id: '1',
          name: 'John Johnson',
          jerseyNumber: 9,
          position: 'ST',
          matchesPlayed: 15,
          goals: 12,
          assists: 5,
          minutesPlayed: 1200,
          passAccuracy: 82,
          tackles: 8,
          rating: 7.8
        },
        {
          id: '2',
          name: 'Mike Smith',
          jerseyNumber: 10,
          position: 'CM',
          matchesPlayed: 18,
          goals: 4,
          assists: 8,
          minutesPlayed: 1500,
          passAccuracy: 89,
          tackles: 25,
          rating: 7.5
        },
        {
          id: '3',
          name: 'David Williams',
          jerseyNumber: 4,
          position: 'CB',
          matchesPlayed: 20,
          goals: 2,
          assists: 1,
          minutesPlayed: 1800,
          passAccuracy: 85,
          tackles: 45,
          rating: 7.2
        }
      ]
      
      setPlayerStats(mockPlayerStats)
      
      // Mock data for team stats
      const mockTeamStats: TeamStats = {
        totalMatches: 20,
        wins: 12,
        draws: 4,
        losses: 4,
        goalsScored: 35,
        goalsConceded: 18,
        cleanSheets: 8
      }
      
      setTeamStats(mockTeamStats)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPerformanceColor = (rating: number) => {
    if (rating >= 7.5) return 'text-green-600'
    if (rating >= 7.0) return 'text-blue-600'
    if (rating >= 6.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <DashboardLayout title="Performance Analytics" subtitle="Loading analytics...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Performance Analytics" 
      subtitle="Track team and player performance"
    >
      <div className="w-full space-y-6">
        {/* Time Range Selector */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button 
              variant={timeRange === 'week' ? 'default' : 'outline'}
              onClick={() => setTimeRange('week')}
            >
              This Week
            </Button>
            <Button 
              variant={timeRange === 'month' ? 'default' : 'outline'}
              onClick={() => setTimeRange('month')}
            >
              This Month
            </Button>
            <Button 
              variant={timeRange === 'season' ? 'default' : 'outline'}
              onClick={() => setTimeRange('season')}
            >
              This Season
            </Button>
          </div>
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Team Stats */}
        {teamStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Win Rate
                </CardTitle>
                <Trophy className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {((teamStats.wins / teamStats.totalMatches) * 100).toFixed(0)}%
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {teamStats.wins}W {teamStats.draws}D {teamStats.losses}L
                </p>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Goals Scored
                </CardTitle>
                <Target className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teamStats.goalsScored}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {(teamStats.goalsScored / teamStats.totalMatches).toFixed(1)} per match
                </p>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Goals Conceded
                </CardTitle>
                <Activity className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teamStats.goalsConceded}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {(teamStats.goalsConceded / teamStats.totalMatches).toFixed(1)} per match
                </p>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Clean Sheets
                </CardTitle>
                <Users className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teamStats.cleanSheets}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {((teamStats.cleanSheets / teamStats.totalMatches) * 100).toFixed(0)}% of matches
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Player Performance */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary-600" />
              Player Performance
            </CardTitle>
            <CardDescription>
              Top performers this {timeRange}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {playerStats.map((player) => (
                <div key={player.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                        {player.jerseyNumber}
                      </div>
                      <div>
                        <h4 className="font-semibold">{player.name}</h4>
                        <Badge variant="outline">{player.position}</Badge>
                      </div>
                    </div>
                    <div className={`text-2xl font-bold ${getPerformanceColor(player.rating)}`}>
                      {player.rating}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Matches</p>
                      <p className="font-medium">{player.matchesPlayed}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Goals</p>
                      <p className="font-medium">{player.goals}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Assists</p>
                      <p className="font-medium">{player.assists}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Mins</p>
                      <p className="font-medium">{player.minutesPlayed}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Pass %</p>
                      <p className="font-medium">{player.passAccuracy}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tackles</p>
                      <p className="font-medium">{player.tackles}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-primary-600" />
                Performance Trend
              </CardTitle>
              <CardDescription>
                Team rating over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <LineChart className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Performance chart visualization</p>
                  <p className="text-xs mt-1">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-primary-600" />
                Goal Distribution
              </CardTitle>
              <CardDescription>
                Goals by position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <PieChart className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Goal distribution chart</p>
                  <p className="text-xs mt-1">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Form */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
              Recent Form
            </CardTitle>
            <CardDescription>
              Last 5 matches results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {['W', 'W', 'D', 'W', 'L'].map((result, index) => (
                <div 
                  key={index}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                    ${result === 'W' ? 'bg-green-500' : result === 'D' ? 'bg-yellow-500' : 'bg-red-500'}
                  `}
                >
                  {result}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
