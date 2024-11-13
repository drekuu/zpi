import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { describe } from "node:test";

export async function GET(req: Request, { params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name
  const photograph = await prisma.photograph.findFirst({
      where: {
        user: {
          is: {
            username: name
          }
        }
      },
      include: {
        user: true
      }
    });

    return new NextResponse(JSON.stringify(
      {
        displayedUserName: photograph?.displayedUserName,
        avatarUrl: photograph?.avatarUrl,
        describe: photograph?.description,
        email: photograph?.user.email,
      }
    ), { status: 200 })
  
}
