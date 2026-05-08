'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Search,
  Filter,
  Eye,
  Edit,
  Trophy,
  Target,
  Activity
} from 'lucide-react'

interface Player {
  id: string
  jerseyNumber: number
  name: string
  position: string
  team: string
  status: string
  skills: {
    speed: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
  }
}

export default function CoachPlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPosition, setFilterPosition] = useState('all')
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    try {
      setLoading(true)
      // Mock data for now
      const mockPlayers: Player[] = [
        {
          id: '1',
          jerseyNumber: 1,
          name: 'John Johnson',
          position: 'GK',
          team: 'U-15',
          status: 'ACTIVE',
          skills: { speed: 60, shooting: 30, passing: 70, dribbling: 50, defending: 80, physical: 75 }
        },
        {
          id: '2',
          jerseyNumber: 2,
          name: 'Mike Smith',
          position: 'RB',
          team: 'U-15',
          status: 'ACTIVE',
          skills: { speed: 85, shooting: 60, passing: 75, dribbling: 80, defending: 70, physical: 80 }
        },
        {
          id: '3',
          jerseyNumber: 4,
          name: 'David Williams',
          position: 'CB',
          team: 'U-15',
          status: 'ACTIVE',
          skills: { speed: 70, shooting: 50, passing: 65, dribbling: 60, defending: 90, physical: 85 }
        },
        {
          id: '4',
          jerseyNumber: 5,
          name: 'James Brown',
          position: 'CB',
          team: 'U-15',
          status: 'ACTIVE',
          skills: { speed: 65, shooting: 45, passing: 60, dribbling: 55, defending: 88, physical: 90 }
        },
        {
          id: '5',
          jerseyNumber: 3,
          name: 'Robert Davis',
          position: 'LB',
          team: 'U-15',
          status: 'ACTIVE',
          skills: { speed: 82, shooting: 55, passing: 70, dribbling: 75, defending: 75, physical: 78 }
        }
      ]
      setPlayers(mockPlayers)
    } catch (error) {
      console.error('Error fetching players:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.jerseyNumber.toString().includes(searchTerm)
    const matchesPosition = filterPosition === 'all' || player.position === filterPosition
    return matchesSearch && matchesPosition
  })

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'GK': return 'bg-yellow-100 text-yellow-800'
      case 'RB':
      case 'CB':
      case 'LB': return 'bg-blue-100 text-blue-800'
      case 'CM':
      case 'CDM':
      case 'CAM': return 'bg-green-100 text-green-800'
      case 'RW':
      case 'LW':
      case 'ST': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'INJURED': return 'bg-red-100 text-red-800'
      case 'SUSPENDED': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Player Management" subtitle="Loading players...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Player Management" 
      subtitle="Manage and evaluate your squad"
    >
      <div className="w-full space-y-6">
        {/* Filters */}
        <Card className="card">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterPosition}
                  onChange={(e) => setFilterPosition(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Positions</option>
                  <option value="GK">Goalkeepers</option>
                  <option value="RB">Right Backs</option>
                  <option value="CB">Center Backs</option>
                  <option value="LB">Left Backs</option>
                  <option value="CM">Center Midfielders</option>
                  <option value="RW">Right Wingers</option>
                  <option value="ST">Strikers</option>
                  <option value="LW">Left Wingers</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <Card 
              key={player.id}
              className="card hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedPlayer(player)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                      {player.jerseyNumber}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{player.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getPositionColor(player.position)}>
                          {player.position}
                        </Badge>
                        <Badge className={getStatusColor(player.status)}>
                          {player.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Team</span>
                    <span className="font-medium">{player.team}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Speed</span>
                      <span className="font-medium">{player.skills.speed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Shooting</span>
                      <span className="font-medium">{player.skills.shooting}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Passing</span>
                      <span className="font-medium">{player.skills.passing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Dribbling</span>
                      <span className="font-medium">{player.skills.dribbling}</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Player Details */}
        {selectedPlayer && (
          <Card className="card border-2 border-emerald-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary-600" />
                  #{selectedPlayer.jerseyNumber} {selectedPlayer.name}
                </CardTitle>
                <Button variant="ghost" onClick={() => setSelectedPlayer(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Activity className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-sm text-gray-600">Speed</span>
                    </div>
                    <p className="text-2xl font-bold">{selectedPlayer.skills.speed}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Target className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-sm text-gray-600">Shooting</span>
                    </div>
                    <p className="text-2xl font-bold">{selectedPlayer.skills.shooting}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Trophy className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-sm text-gray-600">Passing</span>
                    </div>
                    <p className="text-2xl font-bold">{selectedPlayer.skills.passing}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-sm text-gray-600">Overall</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {Math.round((selectedPlayer.skills.speed + selectedPlayer.skills.shooting + selectedPlayer.skills.passing + selectedPlayer.skills.dribbling + selectedPlayer.skills.defending + selectedPlayer.skills.physical) / 6)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    Add to Formation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
