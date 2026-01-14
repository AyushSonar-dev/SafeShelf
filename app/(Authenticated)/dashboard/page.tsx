"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Clock, XCircle } from "lucide-react"
import Link from "next/link"

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
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your warranties.</p>
        </div>
        <Link href="/warranties/add">
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
            <Link key={warranty.id} href={`/warranties/${warranty.id}`}>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{warranty.product}</p>
                  <p className="text-sm text-muted-foreground">{warranty.brand}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">Warranty Expiry</p>
                  <p className="text-sm text-muted-foreground">{warranty.expiryDate}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {warranty.status === "Expired"
                      ? `${warranty.daysAgo} days ago`
                      : `${warranty.daysLeft} days remaining`}
                  </p>
                </div>
                <div className="ml-4">
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
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
