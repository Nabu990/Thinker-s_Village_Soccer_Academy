'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Target
} from 'lucide-react'
import toast from 'react-hot-toast'

interface PendingPlayer {
  id: string
  jerseyNumber: number
  position: string
  height?: number
  weight?: number
  preferredFoot: string
  team: string
  status: string
  createdAt: string
  user: {
    name: string
    email: string
    phoneNumber?: string
    address?: string
    dateOfBirth?: string
  }
}

export default function PendingPlayersPage() {
  const [pendingPlayers, setPendingPlayers] = useState<PendingPlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchPendingPlayers()
  }, [])

  const fetchPendingPlayers = async () => {
    try {
      const response = await fetch('/api/players/pending')
      const data = await response.json()
      if (response.ok) {
        setPendingPlayers(data.pendingPlayers)
      } else {
        toast.error('Failed to fetch pending players')
      }
    } catch (error) {
      toast.error('Failed to fetch pending players')
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = async (playerId: string, action: 'approve' | 'reject') => {
    setActionLoading(playerId)
    try {
      const response = await fetch('/api/players/pending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerId, action }),
      })

      const data = await response.json()
      if (response.ok) {
        toast.success(data.message)
        // Remove the processed player from the list
        setPendingPlayers(prev => prev.filter(player => player.id !== playerId))
      } else {
        toast.error(data.error || 'Failed to process approval')
      }
    } catch (error) {
      toast.error('Failed to process approval')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Pending Players" subtitle="Review player registration requests">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Pending Players" subtitle="Review and approve player registration requests">
      <div className="space-y-6">
        {/* Summary Card */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-amber-600" />
              Pending Approvals
            </CardTitle>
            <CardDescription>
              Players awaiting manager approval to join the academy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {pendingPlayers.length}
              </div>
              <div className="text-gray-600">
                {pendingPlayers.length === 1 ? 'Player' : 'Players'} waiting for approval
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Players List */}
        {pendingPlayers.length === 0 ? (
          <Card className="card">
            <CardContent className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                All Caught Up!
              </h3>
              <p className="text-gray-600">
                No pending player registrations at the moment.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingPlayers.map((player) => (
              <Card key={player.id} className="card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Player Info */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                          {player.jerseyNumber}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {player.user.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {player.position.toLowerCase()} • {player.team}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                          Pending
                        </Badge>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{player.user.email}</span>
                        </div>
                        {player.user.phoneNumber && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{player.user.phoneNumber}</span>
                          </div>
                        )}
                        {player.user.address && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{player.user.address}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Applied {new Date(player.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Player Details */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Height:</span>
                          <span className="font-medium">{player.height || 'N/A'} cm</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Weight:</span>
                          <span className="font-medium">{player.weight || 'N/A'} kg</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Foot:</span>
                          <span className="font-medium">{player.preferredFoot.toLowerCase()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApproval(player.id, 'reject')}
                        disabled={actionLoading === player.id}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        {actionLoading === player.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApproval(player.id, 'approve')}
                        disabled={actionLoading === player.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {actionLoading === player.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        Approve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
