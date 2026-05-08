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
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'
import Link from 'next/link'
import TacticalField from '@/components/TacticalField'

interface Formation {
  id: string
  name: string
  formation: string
  players: Array<{
    id: string
    jerseyNumber: number
    name: string
    position: string
    x: number
    y: number
    isSubstitute: boolean
  }>
}

interface MatchPlan {
  id: string
  opponent: string
  date: string
  formation: Formation
  tactics: string
  notes: string
}

export default function CoachDashboard() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null)
  const [matchPlans, setMatchPlans] = useState<MatchPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [showTacticalBoard, setShowTacticalBoard] = useState(false)

  useEffect(() => {
    fetchCoachData()
  }, [])

  const fetchCoachData = async () => {
    try {
      setLoading(true)
      
      // Mock data for formations
      const mockFormations: Formation[] = [
        {
          id: '1',
          name: '4-3-3 Attack',
          formation: '4-3-3',
          players: [
            { id: '1', jerseyNumber: 1, name: 'GK Johnson', position: 'GK', x: 50, y: 90, isSubstitute: false },
            { id: '2', jerseyNumber: 2, name: 'RB Smith', position: 'RB', x: 20, y: 70, isSubstitute: false },
            { id: '3', jerseyNumber: 4, name: 'CB Williams', position: 'CB', x: 35, y: 75, isSubstitute: false },
            { id: '4', jerseyNumber: 5, name: 'CB Brown', position: 'CB', x: 65, y: 75, isSubstitute: false },
            { id: '5', jerseyNumber: 3, name: 'LB Davis', position: 'LB', x: 80, y: 70, isSubstitute: false },
            { id: '6', jerseyNumber: 6, name: 'CM Miller', position: 'CM', x: 35, y: 50, isSubstitute: false },
            { id: '7', jerseyNumber: 8, name: 'CM Wilson', position: 'CM', x: 50, y: 45, isSubstitute: false },
            { id: '8', jerseyNumber: 10, name: 'CM Taylor', position: 'CM', x: 65, y: 50, isSubstitute: false },
            { id: '9', jerseyNumber: 7, name: 'RW Anderson', position: 'RW', x: 20, y: 25, isSubstitute: false },
            { id: '10', jerseyNumber: 9, name: 'ST Thomas', position: 'ST', x: 50, y: 20, isSubstitute: false },
            { id: '11', jerseyNumber: 11, name: 'LW Jackson', position: 'LW', x: 80, y: 25, isSubstitute: false },
            { id: '12', jerseyNumber: 12, name: 'SUB White', position: 'GK', x: 50, y: 95, isSubstitute: true },
            { id: '13', jerseyNumber: 13, name: 'SUB Harris', position: 'CB', x: 50, y: 95, isSubstitute: true },
            { id: '14', jerseyNumber: 14, name: 'SUB Martin', position: 'CM', x: 50, y: 95, isSubstitute: true },
            { id: '15', jerseyNumber: 15, name: 'SUB Thompson', position: 'ST', x: 50, y: 95, isSubstitute: true },
          ]
        }
      ]
      
      setFormations(mockFormations)
      setSelectedFormation(mockFormations[0])
      
      // Mock data for match plans
      const mockMatchPlans: MatchPlan[] = [
        {
          id: '1',
          opponent: 'LISFA FC',
          date: '2024-01-20',
          formation: mockFormations[0],
          tactics: 'High pressing, quick transitions',
          notes: 'Focus on wing play'
        }
      ]
      
      setMatchPlans(mockMatchPlans)
    } catch (error) {
      console.error('Error fetching coach data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Coach Dashboard" subtitle="Loading your tactical board...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Coach Dashboard" 
      subtitle="Tactical planning and team management"
    >
      <div className="w-full space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Players
              </CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">22</div>
              <p className="text-xs text-gray-600 mt-1">Active squad</p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Formations
              </CardTitle>
              <Target className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formations.length}</div>
              <p className="text-xs text-gray-600 mt-1">Saved tactics</p>
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
              <div className="text-2xl font-bold">{matchPlans.length}</div>
              <p className="text-xs text-gray-600 mt-1">Match plans ready</p>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Training Sessions
              </CardTitle>
              <Trophy className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-600 mt-1">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Tactical Board */}
        <Card className="card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary-600" />
                  Tactical Board
                </CardTitle>
                <CardDescription>
                  Draw and plan your team formations
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={showTacticalBoard ? "default" : "outline"}
                  onClick={() => setShowTacticalBoard(!showTacticalBoard)}
                >
                  {showTacticalBoard ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {showTacticalBoard ? 'Hide Board' : 'Show Board'}
                </Button>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  New Formation
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {showTacticalBoard && selectedFormation && (
              <TacticalField 
                formation={selectedFormation}
                onUpdateFormation={(updatedFormation) => setSelectedFormation(updatedFormation)}
              />
            )}
          </CardContent>
        </Card>

        {/* Formations List */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary-600" />
              Saved Formations
            </CardTitle>
            <CardDescription>
              Your tactical setups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formations.map((formation) => (
                <Card 
                  key={formation.id}
                  className={`cursor-pointer transition-all ${
                    selectedFormation?.id === formation.id 
                      ? 'ring-2 ring-emerald-500 bg-emerald-50' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedFormation(formation)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{formation.name}</CardTitle>
                    <CardDescription>{formation.formation}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {formation.players.filter(p => !p.isSubstitute).length} Starting
                      </Badge>
                      <Badge variant="outline">
                        {formation.players.filter(p => p.isSubstitute).length} Subs
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="cursor-pointer hover:shadow-lg border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full min-h-[120px]">
                  <Plus className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Create New Formation</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Match Plans */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary-600" />
              Match Plans
            </CardTitle>
            <CardDescription>
              Upcoming match preparations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matchPlans.map((plan) => (
                <div key={plan.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">vs {plan.opponent}</h4>
                    <Badge>{new Date(plan.date).toLocaleDateString()}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Formation: {plan.formation.name}</span>
                    <span>•</span>
                    <span>{plan.tactics}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{plan.notes}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card hover:shadow-xl transition-shadow cursor-pointer">
            <Link href="/dashboard/coach/players">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Player Management</h3>
                <p className="text-sm text-gray-600">
                  Manage squad and player profiles
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="card hover:shadow-xl transition-shadow cursor-pointer">
            <Link href="/dashboard/coach/training">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Training Plans</h3>
                <p className="text-sm text-gray-600">
                  Create and manage training sessions
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="card hover:shadow-xl transition-shadow cursor-pointer">
            <Link href="/dashboard/coach/analytics">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                <p className="text-sm text-gray-600">
                  View team and player statistics
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
