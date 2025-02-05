import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Reservation Assistant",
  description: "AI-powered restaurant reservation booking system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} bg-gradient-to-r from-purple-400/30 to-indigo-400/30 backdrop-blur-sm relative`}
      >
        <div className="flex min-h-screen relative">
          {/* Desktop Sidebar */}
          <Sidebar />

          {/* Mobile Menu Button */}
          <div className="fixed top-4 left-4 z-40 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <Sidebar className="block border-0" />
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="lg:px-8 px-4 pt-16 lg:pt-12 max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
