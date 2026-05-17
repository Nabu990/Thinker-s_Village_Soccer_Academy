// Type definitions only — Mongoose models were removed. Use Prisma for runtime DB operations.

export interface IPlayer {
  _id: string
  userId: string
  jerseyNumber: number
  position: 'goalkeeper' | 'defender' | 'midfielder' | 'forward'
  height?: number
  weight?: number
  preferredFoot: 'left' | 'right' | 'both'
  skills: {
    speed: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
  }
  achievements: string[]
  medicalInfo?: {
    allergies?: string
    medications?: string
    emergencyContact?: string
    emergencyPhone?: string
  }
  team: 'U-15' | 'U-17' | 'U-20' | 'Senior'
  status: 'active' | 'injured' | 'suspended' | 'transferred'
  joiningDate: Date
  contractExpiry?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export const Player = undefined as unknown as any
