import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export async function GET(
  request: Request,
  params: { params: { id: string } }
) {
  try {
    const id = params.params.id;
    const users = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!users) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.log(error, "USER ROUTE ERROR-GET");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  params: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    const id = params.params.id;

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "USER ROUTE ERROR-PATCH");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  params: { params: { id: string } }
) {
  try {
    const id = params.params.id;

    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json("User deleted");
  } catch (error) {
    console.log(error, "USER ROUTE ERROR-DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
