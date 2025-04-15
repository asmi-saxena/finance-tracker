"use client"

import { useMemo } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { useFinanceSummary } from "@/lib/hooks"
import { CategoryIcon } from "@/components/category-icon"

export function CategoryPieChart() {
  const { summary, isLoading, error } = useFinanceSummary()

  const chartData = useMemo(() => {
    return summary.categorySummaries.map((category) => ({
      name: category.name,
      value: category.total,
      color: category.color,
      icon: category.icon,
    }))
  }, [summary])

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

  if (chartData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="p-4 text-center text-muted-foreground">
          No category data available for the chart.
          <br />
          Add some categorized transactions to see your spending patterns.
        </Card>
      </div>
    )
  }

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), "Amount"]}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: data.color }} />
                      <span className="font-medium">{data.name}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <CategoryIcon name={data.icon} className="h-3 w-3" />
                      <span>{formatCurrency(data.value)}</span>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
