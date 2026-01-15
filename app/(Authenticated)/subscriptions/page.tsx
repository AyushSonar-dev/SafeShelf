"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, ChevronDown, Download, Upload } from "lucide-react"
import Link from "next/link"

const warranties = [
  {
    id: 1,
    product: 'MacBook Pro 16"',
    brand: "Apple",
    category: "Electronics",
    purchaseDate: "January 15, 2023",
    expiryDate: "January 15, 2025",
    status: "Expired",
    daysAgo: 364,
    description: "Premium laptop with 16-inch display and M3 Max chip",
    billUrl: "/bills/macbook-pro-bill.pdf",
  },
  {
    id: 2,
    product: "iPhone 15 Pro",
    brand: "Apple",
    category: "Electronics",
    purchaseDate: "September 20, 2022",
    expiryDate: "September 20, 2024",
    status: "Expired",
    daysAgo: 481,
    description: "Latest flagship smartphone with advanced camera system",
    billUrl: null,
  },
  {
    id: 3,
    product: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Audio",
    purchaseDate: "November 10, 2024",
    expiryDate: "November 10, 2027",
    status: "Active",
    daysLeft: 665,
    description: "Premium noise-canceling wireless headphones",
    billUrl: "/bills/sony-headphones-bill.pdf",
  },
  {
    id: 4,
    product: "Dell XPS 13",
    brand: "Dell",
    category: "Electronics",
    purchaseDate: "December 1, 2025",
    expiryDate: "December 1, 2028",
    status: "Active",
    daysLeft: 1052,
    description: "Ultra-thin and lightweight laptop for professionals",
    billUrl: null,
  },
  {
    id: 5,
    product: "Samsung Galaxy Watch",
    brand: "Samsung",
    category: "Wearables",
    purchaseDate: "June 15, 2023",
    expiryDate: "June 15, 2025",
    status: "Expired",
    daysAgo: 213,
    description: "Smartwatch with health tracking features",
    billUrl: "/bills/samsung-watch-bill.pdf",
  },
  {
    id: 6,
    product: 'LG OLED TV 55"',
    brand: "LG",
    category: "Electronics",
    purchaseDate: "October 20, 2024",
    expiryDate: "October 20, 2027",
    status: "Active",
    daysLeft: 644,
    description: "4K OLED television with stunning picture quality",
    billUrl: null,
  },
]

type FilterStatus = "All" | "Active" | "Expiring Soon" | "Expired"

export default function WarrantiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("All")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filteredWarranties = warranties.filter((warranty) => {
    const matchesSearch =
      warranty.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warranty.brand.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Active" && warranty.status === "Active") ||
      (activeFilter === "Expired" && warranty.status === "Expired")

    return matchesSearch && matchesFilter
  })

  const handleDownloadBill = (billUrl: string | null, productName: string) => {
    if (billUrl) {
      const link = document.createElement("a")
      link.href = billUrl
      link.download = `${productName}-bill.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

 

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">All Subscriptions</h1>
        <Link href="/subscriptions/add">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Subscription
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search warranties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {(["All", "Active", "Expiring Soon", "Expired"] as FilterStatus[]).map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              variant={activeFilter === filter ? "default" : "outline"}
              className="px-4"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredWarranties.map((warranty) => (
          <Card key={warranty.id} className="overflow-hidden transition-all duration-200">
            {/* Collapsible header */}
            <button
              onClick={() => setExpandedId(expandedId === warranty.id ? null : warranty.id)}
              className="w-full p-6 hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground">{warranty.product}</h3>
                  <p className="text-sm text-muted-foreground">{warranty.brand}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      warranty.status === "Active"
                        ? "default"
                        : warranty.status === "Expired"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {warranty.status}
                  </Badge>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                      expandedId === warranty.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </button>

            {/* Expanded details */}
            {expandedId === warranty.id && (
              <div className="border-t px-6 py-4 space-y-4 bg-muted/30">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Category</p>
                    <p className="font-semibold text-foreground">{warranty.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Purchase Date</p>
                    <p className="font-semibold text-foreground">{warranty.purchaseDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Warranty Expiry</p>
                    <p className="font-semibold text-foreground">{warranty.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Days Remaining</p>
                    <p className="font-semibold text-foreground">
                      {warranty.status === "Expired" ? `${warranty.daysAgo} days ago` : `${warranty.daysLeft} days`}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-foreground">{warranty.description}</p>
                </div>

                <div className="pt-4 border-t mt-4">
                  <p className="text-xs text-muted-foreground mb-3">Bill</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                      onClick={() => handleDownloadBill(warranty.billUrl, warranty.product)}
                      disabled={!warranty.billUrl}
                    >
                      <Download className="h-4 w-4" />
                      Download Bill
                    </Button>
              
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
