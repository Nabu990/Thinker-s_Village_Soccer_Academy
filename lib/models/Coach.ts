import mongoose from 'mongoose'

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

const coachSchema = new mongoose.Schema<ICoach>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: [{
    type: String,
    required: true
  }],
  experience: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  },
  certifications: [{
    type: String
  }],
  qualifications: [{
    type: String
  }],
  coachingLicense: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true,
    maxlength: 1000
  },
  achievements: [{
    type: String
  }],
  teams: [{
    type: String,
    enum: ['U-15', 'U-17', 'U-20', 'Senior']
  }],
  hourlyRate: {
    type: Number,
    min: 0
  },
  availability: {
    monday: { available: { type: Boolean, default: false }, startTime: String, endTime: String },
    tuesday: { available: { type: Boolean, default: false }, startTime: String, endTime: String },
    wednesday: { available: { type: Boolean, default: false }, startTime: String, endTime: String },
    thursday: { available: { type: Boolean, default: false }, startTime: String, endTime: String },
    friday: { available: { type: Boolean, default: false }, startTime: String, endTime: String },
    saturday: { available: { type: Boolean, default: false }, startTime: String, endTime: String },
    sunday: { available: { type: Boolean, default: false }, startTime: String, endTime: String }
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'on-leave', 'inactive'],
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

export const Coach = (mongoose.models && mongoose.models.Coach) || mongoose.model('Coach', coachSchema)
