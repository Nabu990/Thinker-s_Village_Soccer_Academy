'use server'

import mongoose from 'mongoose'

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

const playerSchema = new mongoose.Schema<IPlayer>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jerseyNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  position: {
    type: String,
    required: true,
    enum: ['goalkeeper', 'defender', 'midfielder', 'forward']
  },
  height: {
    type: Number,
    min: 100,
    max: 250
  },
  weight: {
    type: Number,
    min: 30,
    max: 150
  },
  preferredFoot: {
    type: String,
    required: true,
    enum: ['left', 'right', 'both'],
    default: 'right'
  },
  skills: {
    speed: { type: Number, min: 0, max: 100, default: 50 },
    shooting: { type: Number, min: 0, max: 100, default: 50 },
    passing: { type: Number, min: 0, max: 100, default: 50 },
    dribbling: { type: Number, min: 0, max: 100, default: 50 },
    defending: { type: Number, min: 0, max: 100, default: 50 },
    physical: { type: Number, min: 0, max: 100, default: 50 }
  },
  achievements: [{
    type: String
  }],
  medicalInfo: {
    allergies: String,
    medications: String,
    emergencyContact: String,
    emergencyPhone: String
  },
  team: {
    type: String,
    required: true,
    enum: ['U-15', 'U-17', 'U-20', 'Senior'],
    default: 'U-15'
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'injured', 'suspended', 'transferred'],
    default: 'active'
  },
  joiningDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  contractExpiry: Date,
  notes: String
}, {
  timestamps: true
})

export const Player = (mongoose.models && mongoose.models.Player) || mongoose.model('Player', playerSchema)
