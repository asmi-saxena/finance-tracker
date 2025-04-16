"use client"

import { useMemo } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { useFinanceSummary } from "@/lib/hooks"
import { CategoryIcon } from "@/components/category-icon"

export function CategoryPieChart() {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-muted-foreground">Category distribution chart will be displayed here</p>
    </div>
  )
}
