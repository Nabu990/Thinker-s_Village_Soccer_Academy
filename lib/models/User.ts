// Type definitions only — Mongoose models were removed. Use Prisma for runtime DB operations.

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

// Runtime Mongoose model removed. Use Prisma client (lib/prisma.ts) instead.
export const User = undefined as unknown as any
