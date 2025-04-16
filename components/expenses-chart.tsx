"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { useTransactions } from "@/lib/hooks"

export function ExpensesChart() {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-muted-foreground">Expenses chart will be displayed here</p>
    </div>
  )
}
