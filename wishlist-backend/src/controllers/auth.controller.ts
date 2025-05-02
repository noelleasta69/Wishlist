// understand this whole file  ??? 


import { Request, Response, RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../app'
import { SignupInput, LoginInput } from '../validators/auth.schema'

const JWT_SECRET = process.env.JWT_SECRET || 'dfasdfadsf'

export const signup = async (req: Request, res: Response)  => {
  const { email, username, password } = req.body as SignupInput

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return res.status(409).json({ message: 'Email already in use' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, username, password: hashedPassword },
  })

  return res.status(201).json({ message: 'User created', user: { id: user.id, email: user.email, username: user.username } })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginInput

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

  return res.json({ token, user: { id: user.id, email: user.email, username: user.username } })
}

