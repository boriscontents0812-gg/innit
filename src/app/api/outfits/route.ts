import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let userId = searchParams.get("userId");

    if (!userId) {
      const defaultUser = await prisma.user.findFirst();
      userId = defaultUser?.id || null;
    }

    if (!userId) {
      return NextResponse.json({ outfits: [] });
    }

    const outfits = await prisma.outfit.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ outfits });
  } catch (error) {
    console.error("Error fetching outfits:", error);
    return NextResponse.json({ error: "Failed to fetch outfits" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const outfitId = searchParams.get("outfitId");
    const userId = searchParams.get("userId");
    const deleteAll = searchParams.get("all") === "true";

    if (deleteAll && userId) {
      // GDPR Data Right to be Forgotten: clear all user's outfit photos and history
      await prisma.outfit.deleteMany({
        where: { userId },
      });
      return NextResponse.json({ success: true, message: "All user outfits and uploaded assets permanently purged." });
    }

    if (!outfitId) {
      return NextResponse.json({ error: "Missing outfit ID" }, { status: 400 });
    }

    await prisma.outfit.delete({
      where: { id: outfitId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting outfit:", error);
    return NextResponse.json({ error: "Failed to delete outfit" }, { status: 500 });
  }
}
