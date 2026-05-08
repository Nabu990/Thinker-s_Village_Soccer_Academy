'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Save, User, Target, Shield } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function AddPlayerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    jerseyNumber: '',
    position: 'forward',
    height: '',
    weight: '',
    preferredFoot: 'right',
    skills: {
      speed: 50,
      shooting: 50,
      passing: 50,
      dribbling: 50,
      defending: 50,
      physical: 50
    },
    team: 'U-15',
    status: 'active',
    achievements: [],
    medicalInfo: {
      allergies: '',
      medications: '',
      emergencyContact: '',
      emergencyPhone: ''
    },
    notes: ''
  })

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          jerseyNumber: parseInt(formData.jerseyNumber),
          height: formData.height ? parseInt(formData.height) : undefined,
          weight: formData.weight ? parseInt(formData.weight) : undefined,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create player')
      }

      toast.success('Player created successfully!')
      router.push('/dashboard/manager/players')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create player')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name.startsWith('skills.')) {
      const skillName = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skillName]: parseInt(value)
        }
      }))
    } else if (name.startsWith('medicalInfo.')) {
      const medicalField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        medicalInfo: {
          ...prev.medicalInfo,
          [medicalField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <DashboardLayout 
      title="Add New Player" 
      subtitle="Create a new player profile for the academy"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard/manager/players">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Players
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary-600" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Player's basic details and team assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jerseyNumber">Jersey Number *</Label>
                  <Input
                    id="jerseyNumber"
                    name="jerseyNumber"
                    type="number"
                    min="1"
                    max="99"
                    value={formData.jerseyNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter jersey number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="goalkeeper">Goalkeeper</option>
                    <option value="defender">Defender</option>
                    <option value="midfielder">Midfielder</option>
                    <option value="forward">Forward</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team">Team *</Label>
                  <select
                    id="team"
                    name="team"
                    value={formData.team}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="U-15">U-15</option>
                    <option value="U-17">U-17</option>
                    <option value="U-20">U-20</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    min="100"
                    max="250"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Enter height in cm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    min="30"
                    max="150"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter weight in kg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredFoot">Preferred Foot</Label>
                  <select
                    id="preferredFoot"
                    name="preferredFoot"
                    value={formData.preferredFoot}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="injured">Injured</option>
                    <option value="suspended">Suspended</option>
                    <option value="transferred">Transferred</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Assessment */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary-600" />
                Skills Assessment
              </CardTitle>
              <CardDescription>
                Rate the player's skills (0-100)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(formData.skills).map(([skill, value]) => (
                  <div key={skill} className="space-y-2">
                    <Label htmlFor={`skills.${skill}`} className="capitalize">
                      {skill}: {value}
                    </Label>
                    <input
                      id={`skills.${skill}`}
                      name={`skills.${skill}`}
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={handleChange}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary-600" />
                Medical Information
              </CardTitle>
              <CardDescription>
                Important medical details and emergency contacts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalInfo.allergies">Allergies</Label>
                  <textarea
                    id="medicalInfo.allergies"
                    name="medicalInfo.allergies"
                    value={formData.medicalInfo.allergies}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="List any known allergies"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalInfo.medications">Current Medications</Label>
                  <textarea
                    id="medicalInfo.medications"
                    name="medicalInfo.medications"
                    value={formData.medicalInfo.medications}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="List current medications"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalInfo.emergencyContact">Emergency Contact</Label>
                  <Input
                    id="medicalInfo.emergencyContact"
                    name="medicalInfo.emergencyContact"
                    value={formData.medicalInfo.emergencyContact}
                    onChange={handleChange}
                    placeholder="Emergency contact name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalInfo.emergencyPhone">Emergency Phone</Label>
                  <Input
                    id="medicalInfo.emergencyPhone"
                    name="medicalInfo.emergencyPhone"
                    value={formData.medicalInfo.emergencyPhone}
                    onChange={handleChange}
                    placeholder="Emergency contact phone"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card className="card">
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
              <CardDescription>
                Any additional information about the player
              </CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Add any additional notes or observations"
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/dashboard/manager/players">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="btn-primary" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Creating...' : 'Create Player'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
