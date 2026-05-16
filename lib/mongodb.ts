'use server'

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || ''
const options = {}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!uri) {
  console.warn('MongoDB URI not configured - MongoDB client will not be initialized')
} else {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise && uri) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise || null
  } else {
    if (uri) {
      client = new MongoClient(uri, options)
      clientPromise = client.connect()
    }
  }
}

export default clientPromise
