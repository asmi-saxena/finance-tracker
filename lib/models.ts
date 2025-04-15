import mongoose from "mongoose"

// Define Category Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      default: "#94a3b8", // Default slate color
    },
    icon: {
      type: String,
      default: "circle",
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Define Transaction Schema
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  },
)

// Create or retrieve models
export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)
export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema)
