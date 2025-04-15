import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { Category } from "@/lib/models"

const defaultCategories = [
  // Expense categories
  { name: "Food & Dining", color: "#ef4444", icon: "utensils", type: "expense" },
  { name: "Transportation", color: "#f97316", icon: "car", type: "expense" },
  { name: "Housing", color: "#84cc16", icon: "home", type: "expense" },
  { name: "Entertainment", color: "#06b6d4", icon: "film", type: "expense" },
  { name: "Shopping", color: "#8b5cf6", icon: "shopping-bag", type: "expense" },
  { name: "Utilities", color: "#ec4899", icon: "bolt", type: "expense" },
  { name: "Healthcare", color: "#14b8a6", icon: "heart-pulse", type: "expense" },
  { name: "Education", color: "#f59e0b", icon: "book", type: "expense" },
  { name: "Personal Care", color: "#6366f1", icon: "shower", type: "expense" },
  { name: "Travel", color: "#0ea5e9", icon: "plane", type: "expense" },
  { name: "Gifts & Donations", color: "#d946ef", icon: "gift", type: "expense" },
  { name: "Other Expenses", color: "#64748b", icon: "ellipsis", type: "expense" },

  // Income categories
  { name: "Salary", color: "#22c55e", icon: "wallet", type: "income" },
  { name: "Freelance", color: "#10b981", icon: "briefcase", type: "income" },
  { name: "Investments", color: "#059669", icon: "trending-up", type: "income" },
  { name: "Gifts", color: "#16a34a", icon: "gift", type: "income" },
  { name: "Other Income", color: "#65a30d", icon: "plus-circle", type: "income" },
]

export async function GET() {
  try {
    await connectToDatabase()

    // Check if categories already exist
    const existingCount = await Category.countDocuments()

    if (existingCount > 0) {
      return NextResponse.json({ message: "Categories already seeded", count: existingCount })
    }

    // Insert default categories
    await Category.insertMany(defaultCategories)

    return NextResponse.json({ message: "Categories seeded successfully", count: defaultCategories.length })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ error: "Failed to seed categories" }, { status: 500 })
  }
}
