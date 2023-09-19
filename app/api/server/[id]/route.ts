import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request, params: { id: number }) {
  try {
    const { id } = params;
    const server = await prisma.server.findUnique({
      where: {
        id: id,
      },
    });
    if (!server) {
      return NextResponse.json(
        { message: "Server not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(server);
  } catch (error) {
    console.log(error, "SERVER LICENSE ERROR-GET");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(request: Request, params: { id: number }) {
  try {
    const body = await request.json();
    const { name, description, license } = body;
    const { id } = params;

    const updatedServer = await prisma.server.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        license: license as boolean,
      },
    });

    if (!updatedServer) {
      return NextResponse.json(
        { message: "Server not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedServer);
  } catch (error) {
    console.log(error, "SERVER LICENSE ERROR-PATCH");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request: Request, params: { id: number }) {
  try {
    const { id } = params;
    console.log(id);
    await prisma.server.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json("Server deleted");
  } catch (error) {
    console.log(error, "SERVER LICENSE ERROR-DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
