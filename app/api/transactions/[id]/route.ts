import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { Transaction } from "@/lib/models"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const transaction = await Transaction.findById(params.id).populate("category")
    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const body = await request.json()
    const transaction = await Transaction.findByIdAndUpdate(
      params.id,
      {
        $set: {
          ...body,
          type: body.amount > 0 ? "income" : "expense",
        },
      },
      { new: true }
    ).populate("category")
    
    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const transaction = await Transaction.findByIdAndDelete(params.id)
    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    )
  }
}
