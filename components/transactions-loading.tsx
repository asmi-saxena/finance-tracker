import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TransactionsLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 rounded-md border p-4">
          <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-[200px] animate-pulse rounded bg-muted" />
            <div className="h-3 w-[100px] animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}
