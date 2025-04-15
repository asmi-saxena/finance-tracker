"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CategoryIcon } from "@/components/category-icon"

interface CategoryIconPickerProps {
  value: string
  onChange: (value: string) => void
}

const availableIcons = [
  "utensils",
  "car",
  "home",
  "film",
  "shopping-bag",
  "bolt",
  "heart-pulse",
  "book",
  "shower",
  "plane",
  "gift",
  "ellipsis",
  "wallet",
  "briefcase",
  "trending-up",
  "plus-circle",
  "circle",
]

export function CategoryIconPicker({ value, onChange }: CategoryIconPickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <CategoryIcon name={value} className="mr-2 h-4 w-4" />
          <span className="capitalize">{value.replace("-", " ")}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid grid-cols-4 gap-2">
          {availableIcons.map((icon) => (
            <Button
              key={icon}
              variant="outline"
              size="icon"
              className={`h-10 w-10 ${value === icon ? "border-primary" : ""}`}
              onClick={() => {
                onChange(icon)
                setOpen(false)
              }}
            >
              <CategoryIcon name={icon} className="h-5 w-5" />
              <span className="sr-only">{icon}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
