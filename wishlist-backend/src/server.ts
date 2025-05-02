// src/server.ts
import { app, prisma } from './app'

const PORT = process.env.PORT || 5000

async function main() {
  try {
    // Test DB connection
    await prisma.$connect()
    console.log('✅ Connected to PostgreSQL via Prisma')

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

main()

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  console.log('\n🛑 Prisma disconnected')
  process.exit(0)
})
