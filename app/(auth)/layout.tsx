import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session =await auth.api.getSession({headers: await headers()});
  if( session?.user ) redirect("/dashboard");
  return (
  <main className="flex min-h-screen justify-center items-center bg-white">
      <div   >
        {children}
        
      </div>
    </main>
  );
};

export default layout;
