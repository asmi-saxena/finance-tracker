import { NextResponse } from "next/server"
import { getFinanceSummary } from "@/lib/data"

export async function GET() {
  try {
    const summary = await getFinanceSummary()
    return NextResponse.json(summary)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 })
  }
}
