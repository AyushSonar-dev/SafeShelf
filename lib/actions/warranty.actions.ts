"use server"

import { headers } from "next/headers"
import { auth } from "../better-auth/auth"
import dbConnect from "@/database/mongoose"
import { Types } from "mongoose"

interface WarrantyData {
  productName: string
  brand: string
  category: string
  purchaseDate: string
  warrantyDuration: string
  durationUnit: string
  storeName: string
  price: string
  notes: string
  userId: string
  imageUrl?: string | null
}

export async function saveWarranty(formData: FormData) {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return { success: false, message: "Unauthorized - No session found" }
    }

    const userId = session.user.id

    // Extract warranty data from FormData
    const productName = formData.get("productName") as string
    const brand = formData.get("brand") as string
    const category = formData.get("category") as string
    const purchaseDate = formData.get("purchaseDate") as string
    const warrantyDuration = formData.get("warrantyDuration") as string
    const durationUnit = formData.get("durationUnit") as string
    const storeName = formData.get("storeName") as string
    const price = formData.get("price") as string
    const notes = formData.get("notes") as string
    const imageFile = formData.get("image") as File | null

    // Validate required fields
    if (!productName || !brand || !category || !purchaseDate || !warrantyDuration) {
      return { success: false, message: "Missing required fields" }
    }

    // Connect to database
    const mongoose = await dbConnect()
    const db = mongoose.connection.db

    if (!db) {
      return { success: false, message: "Database connection failed" }
    }

    // Get or create warranties collection
    const warrantiesCollection = db.collection("warranties")

    // Calculate expiry date
    const purchaseDateObj = new Date(purchaseDate)
    const expiryDate = new Date(purchaseDateObj)

    if (durationUnit === "years") {
      expiryDate.setFullYear(expiryDate.getFullYear() + parseInt(warrantyDuration))
    } else if (durationUnit === "months") {
      expiryDate.setMonth(expiryDate.getMonth() + parseInt(warrantyDuration))
    }

    // Handle image upload (optional - for now store as null or base64)
    let imageUrl = null
    if (imageFile) {
      try {
        const buffer = await imageFile.arrayBuffer()
        const base64 = Buffer.from(buffer).toString("base64")
        imageUrl = `data:${imageFile.type};base64,${base64}`
      } catch (error) {
        console.error("Error processing image:", error)
        // Continue without image
      }
    }

    // Create warranty document
    const warrantyData: WarrantyData = {
      productName,
      brand,
      category,
      purchaseDate,
      warrantyDuration,
      durationUnit,
      storeName,
      price,
      notes,
      userId,
      imageUrl,
    }

    // Add timestamps
    const warrantyWithTimestamps = {
      ...warrantyData,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: expiryDate,
    }

    // Insert into database
    const result = await warrantiesCollection.insertOne(warrantyWithTimestamps)

    if (result.insertedId) {
      return {
        success: true,
        message: "Warranty saved successfully",
        data: { id: result.insertedId.toString() },
      }
    } else {
      return { success: false, message: "Failed to save warranty" }
    }
  } catch (error) {
    console.error("Error in saveWarranty:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred while saving warranty",
    }
  }
}

export async function getWarranties() {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return { success: false, message: "Unauthorized - No session found", data: [] }
    }

    const userId = session.user.id

    // Connect to database
    const mongoose = await dbConnect()
    const db = mongoose.connection.db

    if (!db) {
      return { success: false, message: "Database connection failed", data: [] }
    }

    // Get warranties collection
    const warrantiesCollection = db.collection("warranties")

    // Fetch all warranties for the current user
    const warranties = await warrantiesCollection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray()

    // Convert to plain objects and calculate status
    const formattedWarranties = warranties.map((warranty: any) => {
      const expiryDate = new Date(warranty.expiryDate)
      const today = new Date()
      const timeDiff = expiryDate.getTime() - today.getTime()
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24))

      let status = "Active"
      if (daysRemaining < 0) {
        status = "Expired"
      } else if (daysRemaining <= 30) {
        status = "Expiring Soon"
      }

      return {
        id: warranty._id?.toString() || "",
        product: warranty.productName,
        brand: warranty.brand,
        category: warranty.category,
        purchaseDate: warranty.purchaseDate,
        expiryDate: expiryDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status,
        daysRemaining: Math.max(daysRemaining, 0),
        daysAgo: Math.abs(daysRemaining),
        storeName: warranty.storeName,
        price: warranty.price,
        notes: warranty.notes,
        imageUrl: warranty.imageUrl,
      }
    })

    return {
      success: true,
      data: formattedWarranties,
    }
  } catch (error) {
    console.error("Error fetching warranties:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred while fetching warranties",
      data: [],
    }
  }
}
