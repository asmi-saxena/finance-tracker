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

export async function TransactionsList({ limit }: TransactionsListProps) {
  const transactions = await getTransactions(limit)

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-4">No transactions found</p>
        <Link href="/transactions/new">
          <Button>Add your first transaction</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell className="font-medium flex items-center gap-2">
                {transaction.amount < 0 ? (
                  <ArrowDownCircle className="h-4 w-4 text-destructive" />
                ) : (
                  <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
                )}
                {transaction.description}
              </TableCell>
              <TableCell>
                {transaction.category ? (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 w-fit"
                    style={{
                      borderColor: (transaction.category as any).color,
                      color: (transaction.category as any).color,
                    }}
                  >
                    <CategoryIcon name={(transaction.category as any).icon} className="h-3 w-3" />
                    {(transaction.category as any).name}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground text-sm">Uncategorized</span>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-medium",
                  transaction.amount < 0 ? "text-destructive" : "text-emerald-500",
                )}
              >
                {formatCurrency(transaction.amount)}
              </TableCell>
              <TableCell>
                <Link href={`/transactions/${transaction._id}/edit`}>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
