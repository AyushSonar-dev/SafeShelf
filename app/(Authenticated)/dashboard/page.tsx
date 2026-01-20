"use client"


import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Clock, XCircle, Download, Upload, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getWarranties } from "@/lib/actions/warranty.actions"

interface Warranty {
  id: string
  product: string
  brand: string
  expiryDate: string
  status: "Active" | "Expiring Soon" | "Expired"
  daysRemaining?: number
  daysAgo?: number
  category: string
  purchaseDate: string
  storeName: string
  price: string
  notes: string
  imageUrl?: string
}

export default function DashboardPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [warranties, setWarranties] = useState<Warranty[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    expiringSoon: 0,
    expired: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWarranties()
        if (result.success && result.data) {
          setWarranties(result.data as Warranty[])

          // Calculate stats
          const total = result.data.length
          const expiringSoon = result.data.filter((w: any) => w.status === "Expiring Soon").length
          const expired = result.data.filter((w: any) => w.status === "Expired").length

          setStats({ total, expiringSoon, expired })
        }
      } catch (error) {
        console.error("Error fetching warranties:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDownloadBill = (id: string) => {
    const link = document.createElement("a")
    link.href = `/api/download-bill/${id}`
    link.download = `warranty-bill-${id}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your warranties.</p>
        </div>
        <Link href="/warrenties/add">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Warranty
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Warranties</p>
              <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Expiring Soon</p>
              <p className="text-3xl font-bold text-foreground">{stats.expiringSoon}</p>
            </div>
            <div className="p-3 bg-yellow-100/50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Expired</p>
              <p className="text-3xl font-bold text-foreground">{stats.expired}</p>
            </div>
            <div className="p-3 bg-red-100/50 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Recent Warranties</h2>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading warranties...</p>
            </div>
          ) : warranties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No warranties yet</p>
              <Link href="/warrenties/add">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Warranty
                </Button>
              </Link>
            </div>
          ) : (
            warranties.map((warranty) => (
              <div key={warranty.id} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedId(expandedId === warranty.id ? null : warranty.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors text-left"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{warranty.product}</p>
                    <p className="text-sm text-muted-foreground">{warranty.brand}</p>
                  </div>
                  <div className="text-right mr-4">
                    <p className="text-sm font-medium text-foreground">Warranty Expiry</p>
                    <p className="text-sm text-muted-foreground">{warranty.expiryDate}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {warranty.status === "Expired"
                        ? `${warranty.daysAgo} days ago`
                        : `${warranty.daysRemaining} days remaining`}
                    </p>
                  </div>
                  <div className="mr-4">
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
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      expandedId === warranty.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedId === warranty.id && (
                  <div className="border-t border-border bg-muted/30 p-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3">Warranty Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Category</p>
                          <p className="text-foreground font-medium">{warranty.category}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Purchase Date</p>
                          <p className="text-foreground font-medium">{warranty.purchaseDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Store</p>
                          <p className="text-foreground font-medium">{warranty.storeName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Price</p>
                          <p className="text-foreground font-medium">{warranty.price || "N/A"}</p>
                        </div>
                      </div>
                      {warranty.notes && (
                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground">Notes</p>
                          <p className="text-foreground text-sm">{warranty.notes}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3">Bill Management</h3>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-2 bg-transparent flex-1"
                          onClick={() => handleDownloadBill(warranty.id)}
                        >
                          <Download className="h-4 w-4" />
                          Download Bill
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
