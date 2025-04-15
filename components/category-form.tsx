"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { CategoryIconPicker } from "@/components/category-icon-picker"
import type { Category } from "@/lib/types"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, { message: "Must be a valid hex color" }),
  icon: z.string().min(1, { message: "Icon is required" }),
  type: z.enum(["income", "expense"]),
})

type FormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
  category?: Category
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const defaultValues: Partial<FormValues> = {
    name: category?.name || "",
    color: category?.color || "#94a3b8",
    icon: category?.icon || "circle",
    type: category?.type || "expense",
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    try {
      const url = category ? `/api/categories/${category._id}` : "/api/categories"

      const method = category ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to save category")
      }

      toast({
        title: category ? "Category updated" : "Category added",
        description: "Your category has been saved successfully.",
      })

      router.push("/categories")
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="expense" />
                    </FormControl>
                    <FormLabel className="font-normal">Expense</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="income" />
                    </FormControl>
                    <FormLabel className="font-normal">Income</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: field.value }} />
                    <Input type="color" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <CategoryIconPicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>Select an icon for this category</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : category ? "Update Category" : "Add Category"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          {category && (
            <Button
              type="button"
              variant="destructive"
              className="ml-auto"
              onClick={async () => {
                if (confirm("Are you sure you want to delete this category?")) {
                  setIsSubmitting(true)
                  try {
                    const response = await fetch(`/api/categories/${category._id}`, {
                      method: "DELETE",
                    })

                    if (!response.ok) {
                      throw new Error("Failed to delete category")
                    }

                    toast({
                      title: "Category deleted",
                      description: "Your category has been deleted successfully.",
                    })

                    router.push("/categories")
                    router.refresh()
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to delete category. Please try again.",
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
