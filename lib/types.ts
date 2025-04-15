export interface Category {
    _id: string
    name: string
    color: string
    icon: string
    type: "income" | "expense"
    createdAt: string
    updatedAt: string
  }
  
  export interface Transaction {
    _id: string
    amount: number
    description: string
    date: string
    type: "income" | "expense"
    category?: string | Category
    createdAt: string
    updatedAt: string
  }
  
  export interface CategorySummary {
    _id: string
    name: string
    color: string
    icon: string
    total: number
    percentage: number
  }
  
  export interface FinanceSummary {
    totalIncome: number
    totalExpenses: number
    balance: number
    categorySummaries: CategorySummary[]
  }
  