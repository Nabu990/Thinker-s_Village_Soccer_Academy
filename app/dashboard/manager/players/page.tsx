'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

interface Player {
  _id: string
  userId: {
    name: string
    email: string
    phoneNumber?: string
  }
  jerseyNumber: number
  position: 'goalkeeper' | 'defender' | 'midfielder' | 'forward'
  team: 'U-15' | 'U-17' | 'U-20' | 'Senior'
  status: 'active' | 'injured' | 'suspended' | 'transferred'
  joiningDate: string
  skills: {
    speed: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
  }
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTeam, setFilterTeam] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchPlayers()
  }, [currentPage, searchTerm, filterTeam, filterStatus])

  const fetchPlayers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        search: searchTerm,
        team: filterTeam,
        status: filterStatus
      })

      const response = await fetch(`/api/players?${params}`)
      const data = await response.json()

      if (response.ok) {
        setPlayers(data.players)
        setTotalPages(data.totalPages)
      } else {
        console.error('Failed to fetch players:', data.error)
      }
    } catch (error) {
      console.error('Error fetching players:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (playerId: string) => {
    if (!confirm('Are you sure you want to delete this player?')) return

    try {
      const response = await fetch(`/api/players/${playerId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setPlayers(players.filter(p => p._id !== playerId))
      } else {
        console.error('Failed to delete player')
      }
    } catch (error) {
      console.error('Error deleting player:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'injured': return 'bg-red-100 text-red-800'
      case 'suspended': return 'bg-yellow-100 text-yellow-800'
      case 'transferred': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'goalkeeper': return 'bg-blue-100 text-blue-800'
      case 'defender': return 'bg-green-100 text-green-800'
      case 'midfielder': return 'bg-purple-100 text-purple-800'
      case 'forward': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.userId.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTeam = filterTeam === 'all' || player.team === filterTeam
    const matchesStatus = filterStatus === 'all' || player.status === filterStatus
    return matchesSearch && matchesTeam && matchesStatus
  })

  return (
    <DashboardLayout 
      title="Player Management" 
      subtitle="Manage all academy players and their information"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Teams</option>
              <option value="U-15">U-15</option>
              <option value="U-17">U-17</option>
              <option value="U-20">U-20</option>
              <option value="Senior">Senior</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="injured">Injured</option>
              <option value="suspended">Suspended</option>
              <option value="transferred">Transferred</option>
            </select>
          </div>

          <Link href="/dashboard/manager/players/add">
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Player
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Players</p>
                  <p className="text-2xl font-bold">{players.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold">{players.filter(p => p.status === 'active').length}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Injured</p>
                  <p className="text-2xl font-bold">{players.filter(p => p.status === 'injured').length}</p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">U-15 Team</p>
                  <p className="text-2xl font-bold">{players.filter(p => p.team === 'U-15').length}</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-xs">15</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Players Table */}
        <Card className="card">
          <CardHeader>
            <CardTitle>Players List</CardTitle>
            <CardDescription>
              Showing {filteredPlayers.length} of {players.length} players
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading players...</p>
              </div>
            ) : filteredPlayers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No players found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Player</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Jersey</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Position</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Team</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Joined</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlayers.map((player) => (
                      <tr key={player._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{player.userId.name}</p>
                            <p className="text-sm text-gray-500">{player.userId.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono font-medium">#{player.jerseyNumber}</span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getPositionColor(player.position)}>
                            {player.position}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{player.team}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(player.status)}>
                            {player.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(player.joiningDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Link href={`/dashboard/manager/players/${player._id}`}>
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link href={`/dashboard/manager/players/${player._id}/edit`}>
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleDelete(player._id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
