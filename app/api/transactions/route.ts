import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { Transaction } from "@/lib/models"

export async function GET() {
  try {
    await connectToDatabase()
    const transactions = await Transaction.find()
      .populate("category")
      .sort({ date: -1 })
    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase()
    const body = await request.json()
    const transaction = await Transaction.create({
      ...body,
      type: body.amount > 0 ? "income" : "expense",
    })
    await transaction.populate("category")
    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    )
  }
}
