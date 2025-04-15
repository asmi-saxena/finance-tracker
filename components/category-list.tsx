import Link from "next/link"
import { Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getCategories } from "@/lib/data"
import { CategoryIcon } from "@/components/category-icon"

export async function CategoryList() {
  const categories = await getCategories()

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-4">No categories found</p>
        <Link href="/categories/new">
          <Button>Add your first category</Button>
        </Link>
      </div>
    )
  }

  // Group categories by type
  const expenseCategories = categories.filter((category) => category.type === "expense")
  const incomeCategories = categories.filter((category) => category.type === "income")

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Expense Categories</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No expense categories found
                  </TableCell>
                </TableRow>
              ) : (
                expenseCategories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="text-xs text-muted-foreground">{category.color}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <CategoryIcon name={category.icon} className="h-4 w-4" />
                    </TableCell>
                    <TableCell>
                      <Link href={`/categories/${category._id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Income Categories</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No income categories found
                  </TableCell>
                </TableRow>
              ) : (
                incomeCategories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="text-xs text-muted-foreground">{category.color}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <CategoryIcon name={category.icon} className="h-4 w-4" />
                    </TableCell>
                    <TableCell>
                      <Link href={`/categories/${category._id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
