import type { Category, Transaction } from "@/lib/types"

export const mockCategories: Category[] = [
  {
    _id: "1",
    name: "Food & Dining",
    color: "#ef4444",
    icon: "utensils",
    type: "expense",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "2",
    name: "Transportation",
    color: "#f97316",
    icon: "car",
    type: "expense",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "3",
    name: "Salary",
    color: "#22c55e",
    icon: "wallet",
    type: "income",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const mockTransactions: Transaction[] = [
  {
    _id: "1",
    amount: -50,
    description: "Lunch at cafe",
    date: new Date().toISOString(),
    type: "expense",
    category: mockCategories[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "2",
    amount: 2000,
    description: "Monthly salary",
    date: new Date().toISOString(),
    type: "income",
    category: mockCategories[2],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "3",
    amount: -30,
    description: "Bus fare",
    date: new Date().toISOString(),
    type: "expense",
    category: mockCategories[1],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
] 