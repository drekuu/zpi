import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcrypt'
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestBody = await req.body
  const { username, password, email, description } = JSON.parse(requestBody)

    const hashedPassword = await bcrypt.hash(password, 10)
    const createdUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword
      }
    })
    if(description){
      await prisma.photograph.create({
        data: {
          description: description,
          userId: createdUser!!.id
        }
      })
    }

    res.status(201).json({ status: 'Sucessfully created new user' })

}
