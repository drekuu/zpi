import { NextApiRequest, NextApiResponse } from "next"
import prisma from '../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    try {
      const users = await prisma.user.findMany()
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to fetch users' })
    } finally {
      await prisma.$disconnect()
    }
  }
