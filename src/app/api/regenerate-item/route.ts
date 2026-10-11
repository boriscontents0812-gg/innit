import { NextRequest, NextResponse } from "next/server";
import { swapOutfitItem } from "@/lib/ai-stylist";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentProductId, slot, swapInstruction, aesthetic } = body;

    if (!slot) {
      return NextResponse.json({ error: "Missing required slot parameter" }, { status: 400 });
    }

    const swappedItem = swapOutfitItem(
      currentProductId || "",
      slot,
      swapInstruction || "",
      aesthetic || "Quiet Luxury"
    );

    return NextResponse.json({
      success: true,
      swappedItem,
    });
  } catch (error) {
    console.error("Error swapping outfit item:", error);
    return NextResponse.json({ error: "Failed to regenerate item" }, { status: 500 });
  }
}
