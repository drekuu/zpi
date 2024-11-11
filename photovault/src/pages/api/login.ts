import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import prisma from "@/lib/prisma";
import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with a strong secret key

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestBody = await req.body;
  console.log(requestBody);
  const { password, email } = JSON.parse(requestBody);

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });

  if (user == null) {
    return res.status(403).json({ status: "Email or password incorrect" });
  }

  const passMatches = await bcrypt.compare(password, user.password);
  if (!passMatches) {
    res.status(403).json({ status: "Email or password incorrect" });
  } else {

    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '10h' });

    res.status(200).json({ token });
  }
}