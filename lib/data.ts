import { connectToDatabase } from "@/lib/mongodb"
import { Transaction, Category } from "@/lib/models"
import type { Transaction as TransactionType, Category as CategoryType, FinanceSummary } from "@/lib/types"

export async function getTransactions(limit?: number): Promise<TransactionType[]> {
  try {
    await connectToDatabase()

    let query = Transaction.find().populate("category").sort({ date: -1 })

    if (limit) {
      query = query.limit(limit)
    }

    const transactions = await query.exec()

    return JSON.parse(JSON.stringify(transactions))
  } catch (error) {
    console.error("Failed to fetch transactions:", error)
    return []
  }
}

export async function getTransactionById(id: string): Promise<TransactionType | null> {
  try {
    await connectToDatabase()
    const transaction = await Transaction.findById(id).populate("category")

    if (!transaction) {
      return null
    }

    return JSON.parse(JSON.stringify(transaction))
  } catch (error) {
    console.error("Failed to fetch transaction:", error)
    return null
  }
}

export async function getCategories(): Promise<CategoryType[]> {
  try {
    await connectToDatabase()
    const categories = await Category.find().sort({ name: 1 })

    return JSON.parse(JSON.stringify(categories))
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return []
  }
}

export async function getCategoryById(id: string): Promise<CategoryType | null> {
  try {
    await connectToDatabase()
    const category = await Category.findById(id)

    if (!category) {
      return null
    }

    return JSON.parse(JSON.stringify(category))
  } catch (error) {
    console.error("Failed to fetch category:", error)
    return null
  }
}

export async function getFinanceSummary(): Promise<FinanceSummary> {
  try {
    await connectToDatabase()

    // Get all transactions
    const transactions = await Transaction.find().populate("category")

    // Calculate total income and expenses
    let totalIncome = 0
    let totalExpenses = 0

    transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        totalIncome += transaction.amount
      } else {
        totalExpenses += Math.abs(transaction.amount)
      }
    })

    // Calculate category summaries
    const categoryMap = new Map()

    transactions.forEach((transaction) => {
      if (!transaction.category) return

      const categoryId = transaction.category._id.toString()
      const amount = Math.abs(transaction.amount)

      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          _id: categoryId,
          name: transaction.category.name,
          color: transaction.category.color,
          icon: transaction.category.icon,
          total: 0,
        })
      }

      categoryMap.get(categoryId).total += amount
    })

    // Convert to array and calculate percentages
    const categorySummaries = Array.from(categoryMap.values())
    const totalAmount = totalIncome + totalExpenses

    categorySummaries.forEach((category) => {
      category.percentage = totalAmount > 0 ? (category.total / totalAmount) * 100 : 0
    })

    // Sort by total amount (descending)
    categorySummaries.sort((a, b) => b.total - a.total)

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      categorySummaries,
    }
  } catch (error) {
    console.error("Failed to fetch finance summary:", error)
    return {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
      categorySummaries: [],
    }
  }
}
