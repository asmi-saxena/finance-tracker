import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { ArrowDownCircle, ArrowUpCircle, Pencil } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { getTransactions } from "@/lib/data"
import { CategoryIcon } from "@/components/category-icon"
import { Badge } from "@/components/ui/badge"

interface TransactionsListProps {
  limit?: number
}

export function TransactionsList({ limit }: TransactionsListProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="p-4 text-center text-muted-foreground">
          No transactions found. Add your first transaction to get started.
        </div>
      </div>
    </div>
  )
}
