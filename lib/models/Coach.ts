'use server'

// Type definitions only — Mongoose models were removed. Use Prisma for runtime DB operations.

export interface ICoach {
  _id: string
  userId: string
  specialization: string[]
  experience: number
  certifications: string[]
  qualifications: string[]
  coachingLicense: string
  bio: string
  achievements: string[]
  teams: string[]
  hourlyRate?: number
  availability: {
    monday: { available: boolean; startTime: string; endTime: string }
    tuesday: { available: boolean; startTime: string; endTime: string }
    wednesday: { available: boolean; startTime: string; endTime: string }
    thursday: { available: boolean; startTime: string; endTime: string }
    friday: { available: boolean; startTime: string; endTime: string }
    saturday: { available: boolean; startTime: string; endTime: string }
    sunday: { available: boolean; startTime: string; endTime: string }
  }
  status: 'active' | 'on-leave' | 'inactive'
  joiningDate: Date
  contractExpiry?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export const Coach = undefined as unknown as any
