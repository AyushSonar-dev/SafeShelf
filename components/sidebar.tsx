"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FileText, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignOut } from "@/lib/actions/auth.actions"

export function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "My Warranties", href: "/warrenties" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-70 bg-sidebar border-r border-sidebar-border flex flex-col p-6">
      <h1 className="text-xl font-bold text-sidebar-foreground mb-8">SafeShelf</h1>

      <nav className="flex-1 space-y-2 ">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard")

          return (
            <Link key={item.href} href={item.href} className="flex gap-2 pb-7">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 px-4",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[1.15rem]">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      <Link href="/sign-in">
        <Button
        onClick={ async ()=>{
          await SignOut();
        }}
          variant="ghost"
          className="w-full justify-start gap-3 px-4 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </Link>
    </div>
  )
}
