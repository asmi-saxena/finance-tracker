import { connectToDatabase } from "./mongodb"
import { Category, Transaction } from "./models"

const MONGODB_URI = "mongodb+srv://saxenaasmi2004:Z3iyZQs9h6SWYpmJ@cluster0.lorfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const categories = [
  {
    name: "Salary",
    color: "#22c55e", // green
    icon: "briefcase",
    type: "income",
  },
  {
    name: "Freelance",
    color: "#3b82f6", // blue
    icon: "laptop",
    type: "income",
  },
  {
    name: "Food & Dining",
    color: "#f59e0b", // amber
    icon: "utensils",
    type: "expense",
  },
  {
    name: "Transportation",
    color: "#6366f1", // indigo
    icon: "car",
    type: "expense",
  },
  {
    name: "Shopping",
    color: "#ec4899", // pink
    icon: "shopping-bag",
    type: "expense",
  },
  {
    name: "Entertainment",
    color: "#8b5cf6", // violet
    icon: "tv",
    type: "expense",
  },
]

const transactions = [
  {
    amount: 3000,
    description: "Monthly Salary",
    date: new Date("2024-04-01"),
    type: "income",
  },
  {
    amount: 500,
    description: "Freelance Project",
    date: new Date("2024-04-05"),
    type: "income",
  },
  {
    amount: -50,
    description: "Grocery Shopping",
    date: new Date("2024-04-02"),
    type: "expense",
  },
  {
    amount: -30,
    description: "Dinner with friends",
    date: new Date("2024-04-03"),
    type: "expense",
  },
  {
    amount: -20,
    description: "Bus fare",
    date: new Date("2024-04-04"),
    type: "expense",
  },
]

async function seedDatabase() {
  try {
    await connectToDatabase(MONGODB_URI)

    // Clear existing data
    await Category.deleteMany({})
    await Transaction.deleteMany({})

    // Insert categories
    const insertedCategories = await Category.insertMany(categories)

    // Map category names to their IDs
    const categoryMap = new Map(
      insertedCategories.map((cat) => [cat.name, cat._id])
    )

    // Add category IDs to transactions
    const transactionsWithCategories = transactions.map((transaction) => ({
      ...transaction,
      category: transaction.type === "income"
        ? transaction.description.includes("Salary")
          ? categoryMap.get("Salary")
          : categoryMap.get("Freelance")
        : transaction.description.includes("Grocery") || transaction.description.includes("Dinner")
          ? categoryMap.get("Food & Dining")
          : transaction.description.includes("Bus")
            ? categoryMap.get("Transportation")
            : categoryMap.get("Shopping"),
    }))

    // Insert transactions
    await Transaction.insertMany(transactionsWithCategories)

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    process.exit(0)
  }
}

seedDatabase() 