"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { User, Bell } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    expiry: true,
  })

  const [email] = useState("user@example.com")

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>

      <Card className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Profile</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email Address
            </Label>
            <Input id="email" type="email" value={email} disabled className="bg-muted text-muted-foreground" />
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Change Password</Button>
        </div>
      </Card>

      <Card className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-100/50 rounded-lg">
            <Bell className="h-6 w-6 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Expiry Reminders</p>
              <p className="text-sm text-muted-foreground">Get notified before warranties expire</p>
            </div>
            <Switch
              checked={notifications.expiry}
              onCheckedChange={(checked) => setNotifications({ ...notifications, expiry: checked })}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
