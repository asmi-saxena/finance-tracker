"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type { Transaction } from "@/lib/types"
import { useCategories } from "@/lib/hooks"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CategoryIcon } from "@/components/category-icon"

const formSchema = z.object({
  amount: z.coerce.number().refine((val) => val !== 0, { message: "Amount cannot be zero" }),
  description: z.string().min(2, { message: "Description must be at least 2 characters" }),
  date: z.date(),
  category: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface TransactionFormProps {
  transaction?: Transaction
}

export function TransactionForm({ transaction }: TransactionFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { categories, isLoading: categoriesLoading } = useCategories()
  const { toast } = useToast()

  const defaultValues: Partial<FormValues> = {
    amount: transaction ? transaction.amount : undefined,
    description: transaction?.description || "",
    date: transaction ? new Date(transaction.date) : new Date(),
    category: transaction?.category
      ? typeof transaction.category === "string"
        ? transaction.category
        : transaction.category._id
      : undefined,
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const watchAmount = form.watch("amount")
  const isExpense = watchAmount ? watchAmount < 0 : false

  // Filter categories based on transaction type
  const filteredCategories = categories.filter((category) => {
    if (!watchAmount) return true
    return watchAmount < 0 ? category.type === "expense" : category.type === "income"
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    try {
      const url = transaction ? `/api/transactions/${transaction._id}` : "/api/transactions"

      const method = transaction ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to save transaction")
      }

      toast({
        title: transaction ? "Transaction updated" : "Transaction added",
        description: "Your transaction has been saved successfully.",
      })

      router.push("/")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  <Input placeholder="0.00" {...field} className="pl-8" />
                </div>
              </FormControl>
              <FormDescription>Use negative values for expenses (e.g., -50.00) and positive for income</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="What was this transaction for?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoriesLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading categories...
                    </SelectItem>
                  ) : filteredCategories.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No categories available
                    </SelectItem>
                  ) : (
                    filteredCategories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="flex-shrink-0 w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <CategoryIcon name={category.icon} className="h-4 w-4" />
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                {isExpense ? "Select an expense category" : "Select an income category"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : transaction ? "Update Transaction" : "Add Transaction"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          {transaction && (
            <Button
              type="button"
              variant="destructive"
              className="ml-auto"
              onClick={async () => {
                if (confirm("Are you sure you want to delete this transaction?")) {
                  setIsSubmitting(true)
                  try {
                    const response = await fetch(`/api/transactions/${transaction._id}`, {
                      method: "DELETE",
                    })

                    if (!response.ok) {
                      throw new Error("Failed to delete transaction")
                    }

                    toast({
                      title: "Transaction deleted",
                      description: "Your transaction has been deleted successfully.",
                    })

                    router.push("/")
                    router.refresh()
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to delete transaction. Please try again.",
                      variant: "destructive",
                    })
                  } finally {
                    setIsSubmitting(false)
                  }
                }
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
