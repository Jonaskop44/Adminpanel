import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, license } = body;
    const server = await prisma.server.create({
      data: {
        name: name,
        description: description,
        license: license as boolean,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(error, "SERVER LICENSE ERROR-POST");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const servers = await prisma.server.findMany();
    return NextResponse.json(servers);
  } catch (error) {
    console.log(error, "SERVER LICENSE ERROR-GET");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    const server = await prisma.server.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(error, "SERVER LICENSE ERROR-DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
