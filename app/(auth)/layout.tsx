import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
  <main className="flex min-h-screen justify-center items-center bg-white">
      <div   >
        {children}
        
      </div>
    </main>
  );
};

export default layout;
