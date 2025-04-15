"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { useTransactions } from "@/lib/hooks"

export function ExpensesChart() {
  const { transactions, isLoading, error } = useTransactions()

  const monthlyData = useMemo(() => {
    if (!transactions) return []

    const now = new Date()
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(now.getMonth() - 5)

    // Create an array of the last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(now.getMonth() - i)
      return {
        month: date.toLocaleString("default", { month: "short" }),
        year: date.getFullYear(),
        expenses: 0,
        income: 0,
      }
    }).reverse()

    // Fill in the data
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date)

      // Only include transactions from the last 6 months
      if (transactionDate >= sixMonthsAgo) {
        const monthName = transactionDate.toLocaleString("default", { month: "short" })
        const year = transactionDate.getFullYear()

        const monthIndex = months.findIndex((m) => m.month === monthName && m.year === year)

        if (monthIndex !== -1) {
          if (transaction.amount < 0) {
            months[monthIndex].expenses += Math.abs(transaction.amount)
          } else {
            months[monthIndex].income += transaction.amount
          }
        }
      }
    })

    return months.map((item) => ({
      ...item,
      name: `${item.month} ${item.year}`,
    }))
  }, [transactions])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Loading chart data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="p-4 text-center text-muted-foreground">Failed to load chart data. Please try again.</Card>
      </div>
    )
  }

  if (monthlyData.length === 0 || monthlyData.every((m) => m.expenses === 0 && m.income === 0)) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="p-4 text-center text-muted-foreground">
          No transaction data available for the chart.
          <br />
          Add some transactions to see your spending patterns.
        </Card>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => formatCurrency(value, { notation: "compact" })} />
        <Tooltip formatter={(value: number) => [formatCurrency(value), ""]} labelFormatter={(label) => `${label}`} />
        <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
        <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
