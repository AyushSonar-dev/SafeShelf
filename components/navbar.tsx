"use client"

import { useState } from "react"
import { User } from "lucide-react"

export function Navbar() {
  const [isHovered, setIsHovered] = useState(false)

  // Mock user data - replace with actual user data from auth/session
  const user = {
    name: "John Anderson",
    email: "user@example.com",
  }

  return (
    <nav className="flex justify-end items-center p-6 bg-background border-b border-border">
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <button className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <User className="h-5 w-5" />
        </button>

        {/* Hover tooltip showing full name */}
        {isHovered && (
          <div className="absolute right-0 mt-2 px-3 py-2 bg-foreground text-background rounded-md text-sm font-medium whitespace-nowrap shadow-lg">
            {user.name}
          </div>
        )}
      </div>
    </nav>
  )
}
