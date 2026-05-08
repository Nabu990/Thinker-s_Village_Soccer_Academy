import mongoose from 'mongoose'

export interface IUser {
  _id: string
  email: string
  password: string
  name: string
  role: 'manager' | 'fan' | 'player'
  profileImage?: string
  phoneNumber?: string
  address?: string
  dateOfBirth?: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['manager', 'fan', 'player'],
    default: 'fan'
  },
  profileImage: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  dateOfBirth: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export const User = (mongoose.models && mongoose.models.User) || mongoose.model('User', userSchema)
