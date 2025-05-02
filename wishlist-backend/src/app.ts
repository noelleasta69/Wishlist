// src/app.ts
import express from 'express'
import cors from 'cors'
// import helmet from 'helmet'
// import morgan from 'morgan'
import { PrismaClient } from '@prisma/client'
// import { ZodError } from 'zod'

import authRoutes from './routes/auth.routes'
import wishlistRoutes from './routes/wishlist.routes';



export const prisma = new PrismaClient()
export const app = express()

// app.use(morgan('dev'))
// app.use(helmet())
app.use(cors())
app.use(express.json())

// Placeholder route
app.get('/', (req, res) => {
  res.json({ message: 'Wishlist API running ✅' })
})


app.use('/api/auth', authRoutes)
app.use('/api/wishlists', wishlistRoutes);

