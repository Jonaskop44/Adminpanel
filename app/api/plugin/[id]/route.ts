import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(
  request: Request,
  params: { params: { id: number } }
) {
  try {
    const id = Number(params.params.id);
    const plugins = await prisma.plugins.findUnique({
      where: {
        id: id,
      },
    });
    if (!plugins) {
      return NextResponse.json(
        { message: "Plugin not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(plugins);
  } catch (error) {
    console.log(error, "PLUGIN LICENSE ERROR-GET");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  params: { params: { id: number } }
) {
  try {
    const body = await request.json();
    const { name, description, license } = body;
    const id = Number(params.params.id);

    const updatedPlugins = await prisma.plugins.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        license: license as boolean,
      },
    });
    if (!updatedPlugins) {
      return NextResponse.json(
        { message: "Plugin not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPlugins);
  } catch (error) {
    console.log(error, "PLUGIN LICENSE ERROR-PATCH");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  params: { params: { id: number } }
) {
  try {
    const id = Number(params.params.id);
    await prisma.plugins.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json("Plugin deleted");
  } catch (error) {
    console.log(error, "PLUGIN LICENSE ERROR-DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
