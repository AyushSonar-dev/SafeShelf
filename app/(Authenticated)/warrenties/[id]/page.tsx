"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Edit2, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const warranty = {
  id: 1,
  product: 'MacBook Pro 16"',
  brand: "Apple",
  category: "Laptops",
  purchaseDate: "January 15, 2023",
  purchasePrice: "$2,499",
  expiryDate: "January 15, 2025",
  warrantyDuration: "2 years",
  status: "Expired",
  storeName: "Apple Store",
  notes: "Original packaging included. International warranty.",
  image: "/macbook-pro-16-inch.jpg",
}

export default function WarrantyDetailPage({ params }: { params: { id: string } }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      window.location.href = "/warranties"
    }, 500)
  }

  return (
    <div className="space-y-8">
      <Link href="/warranties">
        <Button variant="outline" className="gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Back to Warranties
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-6 space-y-6">
            <div className="aspect-square rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              <img
                src={warranty.image || "/placeholder.svg"}
                alt={warranty.product}
                className="w-full h-full object-cover"
              />
            </div>

            <Button className="w-full gap-2">
              <Download className="h-4 w-4" />
              Download Warranty Card
            </Button>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{warranty.product}</h1>
                <p className="text-lg text-muted-foreground mt-1">{warranty.brand}</p>
              </div>
              <Badge
                variant={warranty.status === "Expired" ? "destructive" : "default"}
                className="text-base px-3 py-1"
              >
                {warranty.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Category</p>
                <p className="font-semibold text-foreground">{warranty.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Warranty Duration</p>
                <p className="font-semibold text-foreground">{warranty.warrantyDuration}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Purchase Date</p>
                <p className="font-semibold text-foreground">{warranty.purchaseDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Expiry Date</p>
                <p className="font-semibold text-foreground">{warranty.expiryDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Store Name</p>
                <p className="font-semibold text-foreground">{warranty.storeName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Purchase Price</p>
                <p className="font-semibold text-foreground">{warranty.purchasePrice}</p>
              </div>
            </div>
          </Card>

          {warranty.notes && (
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-3">Notes</h3>
              <p className="text-muted-foreground">{warranty.notes}</p>
            </Card>
          )}

          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Actions</h3>
            <div className="flex gap-3">
              <Link href={`/warranties/${warranty.id}/edit`} className="flex-1">
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Edit2 className="h-4 w-4" />
                  Edit Warranty
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="gap-2 text-destructive hover:text-destructive bg-transparent">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Warranty</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this warranty? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex gap-3 justify-end">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
