import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Missing token." },
      { status: 400 }
    );
  }

  const secret = process.env.JWT_SECRET!;

  try {
    const user = jwt.verify(token, secret)

    const cookiesStore = await cookies();

    cookiesStore.delete("user")
    cookiesStore.delete("token")
    
    cookiesStore.set({
      name: "user",
      value: JSON.stringify(user),
      secure: true,
      httpOnly: true,
      path: "/"
    })

    cookiesStore.set({
      name: "token",
      value: token,
      secure: true,
      httpOnly: true,
      path: "/", 
    });

    revalidatePath("/")

    return NextResponse.json({ success: true }, { status: 200 })
  } catch  {
    return NextResponse.json(
      { success: false, message: "Invalid token." },
      { status: 401 }
    );
  }
}