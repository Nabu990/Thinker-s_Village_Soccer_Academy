import mongoose from 'mongoose'

export interface IGallery {
  _id: string
  title: string
  description: string
  imageUrl: string
  imagePublicId: string
  category: 'match' | 'training' | 'event' | 'award' | 'facility' | 'team'
  tags: string[]
  uploadedBy: string
  date: Date
  featured: boolean
  likes: number
  views: number
  createdAt: Date
  updatedAt: Date
}

const gallerySchema = new mongoose.Schema<IGallery>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  imageUrl: {
    type: String,
    required: true
  },
  imagePublicId: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['match', 'training', 'event', 'award', 'facility', 'team'],
    default: 'training'
  },
  tags: [{
    type: String,
    trim: true
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  featured: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
})

gallerySchema.index({ category: 1, date: -1 })
gallerySchema.index({ featured: 1, date: -1 })
gallerySchema.index({ tags: 1 })

export const Gallery = (mongoose.models && mongoose.models.Gallery) || mongoose.model('Gallery', gallerySchema)
