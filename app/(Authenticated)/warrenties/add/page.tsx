"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ImageIcon } from "lucide-react"
import Link from "next/link"
import { saveWarranty } from "@/lib/actions/warranty.actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function AddWarrantyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    category: "",
    purchaseDate: "",
    warrantyDuration: "",
    durationUnit: "years",
    storeName: "",
    price: "",
    notes: "",
  })

  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.productName || !formData.brand || !formData.category || !formData.purchaseDate || !formData.warrantyDuration) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    try {
      const formDataToSend = new FormData()
      
      // Add warranty data
      formDataToSend.append("productName", formData.productName)
      formDataToSend.append("brand", formData.brand)
      formDataToSend.append("category", formData.category)
      formDataToSend.append("purchaseDate", formData.purchaseDate)
      formDataToSend.append("warrantyDuration", formData.warrantyDuration)
      formDataToSend.append("durationUnit", formData.durationUnit)
      formDataToSend.append("storeName", formData.storeName)
      formDataToSend.append("price", formData.price)
      formDataToSend.append("notes", formData.notes)
      
      // Add image if uploaded
      if (uploadedImage) {
        formDataToSend.append("image", uploadedImage)
      }

      const result = await saveWarranty(formDataToSend)
      
      if (result.success) {
        toast.success("Warranty saved successfully!")
        router.push("/warrenties")
      } else {
        toast.error(result.message || "Failed to save warranty")
      }
    } catch (error) {
      console.error("Error saving warranty:", error)
      toast.error("An error occurred while saving the warranty")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Link href="/warrenties">
        <Button variant="outline" className="gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Back to subscriptions
        </Button>
      </Link>

      <div className="max-w-2xl">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">Add New Subscription</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Label className="text-foreground">Product Image</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-40 w-40 object-cover rounded-lg mx-auto"
                    />
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">{uploadedImage?.name}</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          document.getElementById("imageUpload")?.click()
                        }}
                      >
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="imageUpload" className="cursor-pointer space-y-2">
                    <div className="flex justify-center">
                      <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="productName" className="text-foreground">
                  Product Name
                </Label>
                <Input
                  id="productName"
                  placeholder="e.g., iPhone 15 Pro"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand" className="text-foreground">
                  Brand
                </Label>
                <Input
                  id="brand"
                  placeholder="e.g., Apple"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="appliances">Appliances</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="vehicles">Vehicles</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseDate" className="text-foreground">
                  Purchase Date
                </Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-foreground">
                  Warranty Duration
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 2"
                    value={formData.warrantyDuration}
                    onChange={(e) => setFormData({ ...formData, warrantyDuration: e.target.value })}
                    required
                    className="flex-1"
                  />
                  <Select
                    value={formData.durationUnit}
                    onValueChange={(value) => setFormData({ ...formData, durationUnit: value })}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-foreground">
                  Purchase Price (Optional)
                </Label>
                <Input
                  id="price"
                  placeholder="e.g., $999"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="storeName" className="text-foreground">
                  Store Name
                </Label>
                <Input
                  id="storeName"
                  placeholder="e.g., Best Buy, Apple Store"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-foreground">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about the warranty..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Warranty"}
              </Button>
              <Link href="/warrenties" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
