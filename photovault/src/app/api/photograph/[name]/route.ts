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
export async function   
 PUT(req: Request, { params }: { params:   
 Promise<{ name: string }> }) {
  try {
    const name = (await params).name;
    const data = await req.json();

    const updatedPhotograph = await prisma.photograph.updateMany({
      where: {
        user: {
          is: {
            username: name
          }
        }
      },
      data: {
        displayedUserName: data.displayedUserName,
        avatarUrl: data.avatarUrl,
        description: data.aboutMe,
        email: data.email
      },
      include: { 
        user: true
      }
    });

    return new NextResponse(JSON.stringify(updatedPhotograph), { status: 200 });
  } catch (error) {
    console.error('Error updating photograph:', error);
    return new NextResponse('Error updating photograph', { status: 500 });
  }
}
