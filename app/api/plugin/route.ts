import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, license } = body;
    const plugin = await prisma.plugins.create({
      data: {
        name: name,
        description: description,
        license: license as boolean,
      },
    });
    return NextResponse.json(plugin);
  } catch (error) {
    console.log(error, "PLUGIN LICENSE ERROR-POST");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const plugins = await prisma.plugins.findMany();
    return NextResponse.json(plugins);
  } catch (error) {
    console.log(error, "PLUGIN LICENSE ERROR-GET");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
