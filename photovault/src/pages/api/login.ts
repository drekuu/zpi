import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcrypt'
import prisma from "@/lib/prisma";
import { setCookie } from 'cookies-next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestBody = await req.body
  const { password, email } = JSON.parse(requestBody)

    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })
    if(user == null){
      res.status(403).json({status: "Email or password incorrect"})
    }

    const passMatches = await bcrypt.compare(password, user!!.password)
    if(!passMatches){
      res.status(403).json({status: "Email or password incorrect"})
    }
    else{
      setCookie("email", email, {maxAge: 60 * 60 * 24})
      res.status(200)
    }
}
