"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Clock, XCircle, Download, Upload, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const recentWarranties = [
  {
    id: 1,
    product: 'MacBook Pro 16"',
    brand: "Apple",
    expiryDate: "January 15, 2025",
    status: "Expired",
    daysAgo: 364,
  },
  {
    id: 2,
    product: "iPhone 15 Pro",
    brand: "Apple",
    expiryDate: "September 20, 2024",
    status: "Expired",
    daysAgo: 481,
  },
  {
    id: 3,
    product: "Sony WH-1000XM5",
    brand: "Sony",
    expiryDate: "November 10, 2027",
    status: "Active",
    daysLeft: 665,
  },
]

export default function DashboardPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const handleDownloadBill = (id: number) => {
    const link = document.createElement("a")
    link.href = `/api/download-bill/${id}`
    link.download = `warranty-bill-${id}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleUploadBill = (id: number) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".pdf,.jpg,.jpeg,.png"
    input.onchange = (e: any) => {
      const file = e.target.files?.[0]
      if (file) {
        console.log(`Uploading bill for warranty ${id}:`, file.name)
        // Handle file upload to backend
      }
    }
    input.click()
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
              <p className="text-3xl font-bold text-foreground">6</p>
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
              <p className="text-3xl font-bold text-foreground">0</p>
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
              <p className="text-3xl font-bold text-foreground">3</p>
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
          {recentWarranties.map((warranty) => (
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
                      : `${warranty.daysLeft} days remaining`}
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
                    <h3 className="text-sm font-semibold text-foreground mb-3">Bill Management</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 bg-transparent"
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
          ))}
        </div>
      </Card>
    </div>
  )
}
