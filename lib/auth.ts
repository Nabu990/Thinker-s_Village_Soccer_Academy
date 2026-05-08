import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from './models'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'

export interface JWTPayload {
  userId: string
  email: string
  role: 'manager' | 'fan' | 'player' | 'coach'
  name: string
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export async function createUser(userData: {
  email: string
  password: string
  name: string
  role: 'manager' | 'fan' | 'player'
  phoneNumber?: string
  address?: string
  dateOfBirth?: Date
}) {
  const existingUser = await User.findOne({ email: userData.email })
  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hashPassword(userData.password)
  
  const user = new User({
    ...userData,
    password: hashedPassword
  })

  return await user.save()
}

export async function authenticateUser(email: string, password: string) {
  const user = await User.findOne({ email, isActive: true })
  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isValidPassword = await verifyPassword(password, user.password)
  if (!isValidPassword) {
    throw new Error('Invalid credentials')
  }

  const payload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name
  }

  const token = generateToken(payload)

  return {
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      profileImage: user.profileImage,
      phoneNumber: user.phoneNumber,
      address: user.address,
      dateOfBirth: user.dateOfBirth
    },
    token
  }
}
