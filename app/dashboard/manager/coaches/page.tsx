'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Shield, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Calendar,
  Award,
  Users
} from 'lucide-react'
import Link from 'next/link'

interface Coach {
  _id: string
  userId: {
    name: string
    email: string
    phoneNumber?: string
  }
  specialization: string[]
  experience: number
  certifications: string[]
  coachingLicense: string
  bio: string
  teams: string[]
  status: 'active' | 'on-leave' | 'inactive'
  joiningDate: string
  availability: {
    monday: { available: boolean }
    tuesday: { available: boolean }
    wednesday: { available: boolean }
    thursday: { available: boolean }
    friday: { available: boolean }
    saturday: { available: boolean }
    sunday: { available: boolean }
  }
}

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    fetchCoaches()
  }, [searchTerm, filterStatus])

  const fetchCoaches = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        search: searchTerm,
        status: filterStatus
      })

      const response = await fetch(`/api/coaches?${params}`)
      const data = await response.json()

      if (response.ok) {
        setCoaches(data.coaches)
      } else {
        console.error('Failed to fetch coaches:', data.error)
      }
    } catch (error) {
      console.error('Error fetching coaches:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (coachId: string) => {
    if (!confirm('Are you sure you want to delete this coach?')) return

    try {
      const response = await fetch(`/api/coaches/${coachId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setCoaches(coaches.filter(c => c._id !== coachId))
      } else {
        console.error('Failed to delete coach')
      }
    } catch (error) {
      console.error('Error deleting coach:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'on-leave': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityDays = (availability: Coach['availability']) => {
    return Object.entries(availability)
      .filter(([_, day]) => day.available)
      .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1, 3))
      .join(', ')
  }

  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = coach.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coach.userId.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coach.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || coach.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout 
      title="Coach Management" 
      subtitle="Manage coaching staff and their assignments"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search coaches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <Link href="/dashboard/manager/coaches/add">
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Coach
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Coaches</p>
                  <p className="text-2xl font-bold">{coaches.length}</p>
                </div>
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold">{coaches.filter(c => c.status === 'active').length}</p>
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
                  <p className="text-sm text-gray-600">Avg Experience</p>
                  <p className="text-2xl font-bold">
                    {coaches.length > 0 ? Math.round(coaches.reduce((sum, c) => sum + c.experience, 0) / coaches.length) : 0}y
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Teams Covered</p>
                  <p className="text-2xl font-bold">
                    {[...new Set(coaches.flatMap(c => c.teams))].length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coaches List */}
        <Card className="card">
          <CardHeader>
            <CardTitle>Coaching Staff</CardTitle>
            <CardDescription>
              Showing {filteredCoaches.length} of {coaches.length} coaches
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading coaches...</p>
              </div>
            ) : filteredCoaches.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No coaches found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCoaches.map((coach) => (
                  <div key={coach._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <Shield className="w-8 h-8 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{coach.userId.name}</h3>
                          <p className="text-sm text-gray-500">{coach.userId.email}</p>
                          <Badge className={getStatusColor(coach.status)}>
                            {coach.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/dashboard/manager/coaches/${coach._id}`}>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/manager/coaches/${coach._id}/edit`}>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleDelete(coach._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">Specialization</h4>
                        <div className="flex flex-wrap gap-2">
                          {coach.specialization.map((spec, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">Teams</h4>
                        <div className="flex flex-wrap gap-2">
                          {coach.teams.map((team, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {team}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Experience:</span>
                          <span className="ml-2 font-medium">{coach.experience} years</span>
                        </div>
                        <div>
                          <span className="text-gray-500">License:</span>
                          <span className="ml-2 font-medium">{coach.coachingLicense}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Joined:</span>
                          <span className="ml-2 font-medium">
                            {new Date(coach.joiningDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Available:</span>
                          <span className="ml-2 font-medium text-xs">
                            {getAvailabilityDays(coach.availability)}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-1">Bio</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{coach.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
