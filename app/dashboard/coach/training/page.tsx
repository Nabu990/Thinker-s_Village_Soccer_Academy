'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Target,
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  Users,
  Activity
} from 'lucide-react'

interface TrainingSession {
  id: string
  title: string
  date: string
  time: string
  duration: string
  type: string
  intensity: 'LOW' | 'MEDIUM' | 'HIGH'
  attendees: number
  exercises: string[]
  notes: string
}

export default function CoachTrainingPage() {
  const [sessions, setSessions] = useState<TrainingSession[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null)

  useEffect(() => {
    fetchTrainingSessions()
  }, [])

  const fetchTrainingSessions = async () => {
    try {
      setLoading(true)
      // Mock data for now
      const mockSessions: TrainingSession[] = [
        {
          id: '1',
          title: 'Technical Training - Ball Control',
          date: new Date(Date.now() + 86400000).toISOString(),
          time: '10:00 AM',
          duration: '90 minutes',
          type: 'Technical',
          intensity: 'HIGH',
          attendees: 18,
          exercises: ['Dribbling drills', 'Passing patterns', 'Shooting practice'],
          notes: 'Focus on first touch and close control'
        },
        {
          id: '2',
          title: 'Physical Conditioning',
          date: new Date(Date.now() + 172800000).toISOString(),
          time: '2:00 PM',
          duration: '60 minutes',
          type: 'Physical',
          intensity: 'MEDIUM',
          attendees: 20,
          exercises: ['Interval running', 'Agility drills', 'Strength training'],
          notes: 'Build stamina and agility'
        },
        {
          id: '3',
          title: 'Tactical Training - Set Pieces',
          date: new Date(Date.now() + 259200000).toISOString(),
          time: '10:00 AM',
          duration: '90 minutes',
          type: 'Tactical',
          intensity: 'HIGH',
          attendees: 22,
          exercises: ['Corner kicks', 'Free kicks', 'Throw-ins'],
          notes: 'Prepare for upcoming match'
        }
      ]
      setSessions(mockSessions)
    } catch (error) {
      console.error('Error fetching training sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'LOW': return 'bg-green-100 text-green-800'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800'
      case 'HIGH': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Technical': return 'bg-blue-100 text-blue-800'
      case 'Physical': return 'bg-orange-100 text-orange-800'
      case 'Tactical': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Training Plans" subtitle="Loading training sessions...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Training Plans" 
      subtitle="Create and manage training sessions"
    >
      <div className="w-full space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                This Week
              </CardTitle>
              <Calendar className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-600 mt-1">Sessions planned</p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Hours
              </CardTitle>
              <Clock className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.5</div>
              <p className="text-xs text-gray-600 mt-1">Training time</p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg Attendance
              </CardTitle>
              <Users className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-gray-600 mt-1">Players per session</p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                High Intensity
              </CardTitle>
              <Activity className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-600 mt-1">Sessions this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Training Sessions */}
        <Card className="card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary-600" />
                  Training Sessions
                </CardTitle>
                <CardDescription>
                  Upcoming and recent training plans
                </CardDescription>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Session
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div 
                  key={session.id}
                  className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setSelectedSession(session)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">{session.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(session.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {session.time} ({session.duration})
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {session.attendees} players
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getTypeColor(session.type)}>
                        {session.type}
                      </Badge>
                      <Badge className={getIntensityColor(session.intensity)}>
                        {session.intensity}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-2">Exercises:</p>
                    <div className="flex flex-wrap gap-2">
                      {session.exercises.map((exercise, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {exercise}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {session.notes && (
                    <p className="text-sm text-gray-500 italic">{session.notes}</p>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Activity className="w-4 h-4 mr-2" />
                      View Attendance
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Session Details */}
        {selectedSession && (
          <Card className="card border-2 border-emerald-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary-600" />
                  {selectedSession.title}
                </CardTitle>
                <Button variant="ghost" onClick={() => setSelectedSession(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{new Date(selectedSession.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium">{selectedSession.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">{selectedSession.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Attendees</p>
                    <p className="font-medium">{selectedSession.attendees} players</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Training Exercises:</p>
                  <ul className="space-y-2">
                    {selectedSession.exercises.map((exercise, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {selectedSession.notes && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Notes:</p>
                    <p className="text-sm">{selectedSession.notes}</p>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Session
                  </Button>
                  <Button variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Attendance
                  </Button>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
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
