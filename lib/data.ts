import type { Transaction as TransactionType, Category as CategoryType, FinanceSummary } from "@/lib/types"
import { mockCategories, mockTransactions } from "./mock-data"

export async function getTransactions(limit?: number): Promise<TransactionType[]> {
  try {
    // Return mock data instead of fetching from MongoDB
    return limit ? mockTransactions.slice(0, limit) : mockTransactions
  } catch (error) {
    console.error("Failed to fetch transactions:", error)
    return []
  }
}

export async function getTransactionById(id: string): Promise<TransactionType | null> {
  try {
    // Return mock transaction by ID
    return mockTransactions.find(t => t._id === id) || null
  } catch (error) {
    console.error("Failed to fetch transaction:", error)
    return null
  }
}

export async function getCategories(): Promise<CategoryType[]> {
  try {
    // Return mock categories
    return mockCategories
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return []
  }
}

export async function getCategoryById(id: string): Promise<CategoryType | null> {
  try {
    // Return mock category by ID
    return mockCategories.find(c => c._id === id) || null
  } catch (error) {
    console.error("Failed to fetch category:", error)
    return null
  }
}

export async function getFinanceSummary(): Promise<FinanceSummary> {
  try {
    // Calculate finance summary using mock data
    // This is a placeholder and should be replaced with actual implementation
    return {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
      categorySummaries: [],
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
