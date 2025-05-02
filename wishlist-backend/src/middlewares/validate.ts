import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ZodSchema } from 'zod'

export const validate = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      res.status(400).json({
        message: 'Validation failed',
        error,
      })
    }
  }
}
