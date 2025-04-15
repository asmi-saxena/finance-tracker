import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle, TagIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionsList } from "@/components/transactions-list"
import { ExpensesChart } from "@/components/expenses-chart"
import { TransactionsLoading } from "@/components/transactions-loading"
import { SummaryCards } from "@/components/summary-cards"
import { CategoryPieChart } from "@/components/category-pie-chart"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-semibold">Personal Finance Tracker</h1>
          <div className="flex items-center gap-2">
            <Link href="/categories">
              <Button variant="outline">
                <TagIcon className="mr-2 h-4 w-4" />
                Categories
              </Button>
            </Link>
            <Link href="/transactions/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <Suspense fallback={<div>Loading summary...</div>}>
            <SummaryCards />
          </Suspense>

          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Expenses</CardTitle>
                    <CardDescription>Your spending over the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <Suspense
                      fallback={<div className="flex h-full items-center justify-center">Loading chart...</div>}
                    >
                      <ExpensesChart />
                    </Suspense>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>Your spending distribution by category</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <Suspense
                      fallback={<div className="flex h-full items-center justify-center">Loading chart...</div>}
                    >
                      <CategoryPieChart />
                    </Suspense>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your most recent financial activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<TransactionsLoading />}>
                    <TransactionsList limit={5} />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transactions">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>All Transactions</CardTitle>
                    <CardDescription>Manage your transactions</CardDescription>
                  </div>
                  <Link href="/transactions/new">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Transaction
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<TransactionsLoading />}>
                    <TransactionsList />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
