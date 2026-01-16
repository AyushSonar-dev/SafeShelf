"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, ChevronDown, Download, Upload } from "lucide-react"
import Link from "next/link"
import { getWarranties } from "@/lib/actions/warranty.actions"

type FilterStatus = "All" | "Active" | "Expiring Soon" | "Expired"

interface Warranty {
  id: string
  product: string
  brand: string
  category: string
  purchaseDate: string
  expiryDate: string
  status: "Active" | "Expiring Soon" | "Expired"
  daysRemaining?: number
  daysAgo?: number
  notes: string
  price: string
  storeName: string
  imageUrl?: string
}

export default function WarrantiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [warranties, setWarranties] = useState<Warranty[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWarranties()
        if (result.success && result.data) {
          setWarranties(result.data as Warranty[])
        }
      } catch (error) {
        console.error("Error fetching warranties:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredWarranties = warranties.filter((warranty) => {
    const matchesSearch =
      warranty.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warranty.brand.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Active" && warranty.status === "Active") ||
      (activeFilter === "Expiring Soon" && warranty.status === "Expiring Soon") ||
      (activeFilter === "Expired" && warranty.status === "Expired")

    return matchesSearch && matchesFilter
  })

  const handleDownloadImage = async (warranty: Warranty) => {
    if (!warranty.imageUrl) {
      alert("No image available for this warranty")
      return
    }

    try {
      setDownloadingId(warranty.id)
      const response = await fetch(warranty.imageUrl)
      
      if (!response.ok) {
        throw new Error("Failed to download image")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${warranty.product}_${warranty.brand}_warranty.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading image:", error)
      alert("Failed to download warranty bill")
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">All Warranties</h1>
        <Link href="/warrenties/add">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Warranty
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
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading warranties...</p>
          </div>
        ) : filteredWarranties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {warranties.length === 0 ? "No warranties yet" : "No warranties match your search"}
            </p>
            {warranties.length === 0 && (
              <Link href="/warrenties/add">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Warranty
                </Button>
              </Link>
            )}
          </div>
        ) : (
          filteredWarranties.map((warranty) => (
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
                        {warranty.status === "Expired"
                          ? `${warranty.daysAgo} days ago`
                          : `${warranty.daysRemaining} days`}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Store</p>
                      <p className="font-semibold text-foreground">{warranty.storeName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Price</p>
                      <p className="font-semibold text-foreground">{warranty.price || "N/A"}</p>
                    </div>
                  </div>

                  {warranty.notes && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Notes</p>
                      <p className="text-sm text-foreground">{warranty.notes}</p>
                    </div>
                  )}

                  {warranty.imageUrl && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Warranty Bill</p>
                      <img
                        src={warranty.imageUrl}
                        alt={`${warranty.product} warranty bill`}
                        className="h-40 w-40 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="pt-4 border-t mt-4">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleDownloadImage(warranty)}
                        disabled={!warranty.imageUrl || downloadingId === warranty.id}
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent flex-1"
                      >
                        <Download className="h-4 w-4" />
                        {downloadingId === warranty.id ? "Downloading..." : "Download Bill"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}