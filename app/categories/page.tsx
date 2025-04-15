import Link from "next/link"
import { ArrowLeft, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryList } from "@/components/category-list"
import { Suspense } from "react"
import { CategoryListLoading } from "@/components/category-list-loading"

export default function CategoriesPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="inline-flex items-center">
          <Button variant="ghost" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <Link href="/categories/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your transaction categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<CategoryListLoading />}>
            <CategoryList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
