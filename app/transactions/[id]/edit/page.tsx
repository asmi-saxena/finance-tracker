import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionForm } from "@/components/transaction-form"
import { getTransactionById } from "@/lib/data"

export default async function EditTransactionPage({ params }: { params: { id: string } }) {
  const transaction = await getTransactionById(params.id)

  if (!transaction) {
    notFound()
  }

  return (
    <div className="container py-6">
      <Link href="/" className="inline-flex items-center mb-4">
        <Button variant="ghost" className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Edit Transaction</CardTitle>
          <CardDescription>Update transaction details</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm transaction={transaction} />
        </CardContent>
      </Card>
    </div>
  )
}
