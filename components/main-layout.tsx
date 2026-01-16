import type React from "react"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { auth } from "@/lib/better-auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function MainLayout({ children }: { children: React.ReactNode }) {
  const session=await auth.api.getSession({
    headers:await headers()
  })
  if(!session?.user){
    redirect("/sign-in")
  }
  const user ={
    id:session.user.id,
    name:session.user.name,
    email:session.user.email,

  }
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-70 p-8 bg-background">{children}</main>
      </div>
    </div>
  )
}
