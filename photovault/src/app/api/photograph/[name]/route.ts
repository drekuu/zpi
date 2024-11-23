
import { NextResponse } from "next/server";
import { describe } from "node:test";
import prisma from "../../_lib/prisma";

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
        avatarUrl: photograph?.avatarURL,
        describe: photograph?.description,
        displayedEmail: photograph?.user.email,
      }
    ), { status: 200 })
  
}
export async function   
 PUT(req: Request, { params }: { params:   
 Promise<{ name: string }> }) {
  try {
    const name = (await params).name;
    const data = await req.json();

    console.log(data)
    console.log(name)

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
        avatarURL: data.avatarUrl,
        description: data.aboutMe,
        displayedEmail: data.email
      },
    });

    return new NextResponse(JSON.stringify(updatedPhotograph), { status: 200 });
  } catch (error) {
    console.error('Error updating photograph:', error);
    return new NextResponse('Error updating photograph', { status: 500 });
  }
}
