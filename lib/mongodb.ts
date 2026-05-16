// MongoDB client support has been removed from this project in favor of Prisma/Postgres.
// If you rely on MongoDB, set MONGODB_URI in your environment and restore a MongoClient instance.

const message = 'MongoDB client removed. Use Prisma (Postgres) or restore this file.'

export default (async function() {
  throw new Error(message)
})()
