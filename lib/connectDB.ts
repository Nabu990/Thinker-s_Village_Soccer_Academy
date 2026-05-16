// This project no longer uses a MongoDB connection. The previous Mongoose-based
// connection utilities have been removed. If you need MongoDB for specific
// features, re-add a connection util and set MONGODB_URI in your environment.

export function connectToDatabase() {
  throw new Error('Mongoose/MongoDB support removed. Use Prisma/Postgres or re-enable MongoDB manually.')
}
