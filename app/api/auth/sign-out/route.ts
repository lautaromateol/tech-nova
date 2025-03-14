import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const cookiesStore = await cookies();

    cookiesStore.delete("user")
    cookiesStore.delete("token")

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json(
      { success: false, message: "Inexistent tokens." },
      { status: 400 }
    );
  }
}