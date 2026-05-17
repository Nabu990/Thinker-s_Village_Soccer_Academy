import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

export interface JWTPayload {
  userId: string
  email: string
  role: 'MANAGER' | 'FAN' | 'PLAYER' | 'COACH'
  name: string
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET || 'fallback-secret-key', { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as JWTPayload
  } catch (error) {
    return null
  }
}

export async function createUser(userData: {
  email: string
  password: string
  name: string
  role: 'MANAGER' | 'FAN' | 'PLAYER' | 'COACH'
  phoneNumber?: string
  address?: string
  dateOfBirth?: Date
  isActive?: boolean
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email }
  })

  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hashPassword(userData.password)
  
  const user = await prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      role: userData.role,
      phoneNumber: userData.phoneNumber || '',
      address: userData.address || '',
      dateOfBirth: userData.dateOfBirth || undefined,
      isActive: userData.isActive !== undefined ? userData.isActive : true,
      profileImage: ''
    }
  })

  return user
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findFirst({
    where: { 
      email: email,
      isActive: true 
    }
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isValidPassword = await verifyPassword(password, user.password)
  if (!isValidPassword) {
    throw new Error('Invalid credentials')
  }

  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role as 'MANAGER' | 'FAN' | 'PLAYER' | 'COACH',
    name: user.name
  }

  const token = generateToken(payload)

  return {
    user: {
      id: user.id,
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

export function createToken(user: any): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name
  }
  return generateToken(payload)
}
