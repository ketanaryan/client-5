"use client"

import { Menu, CalendarDays, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "./Sidebar"

export function Header({ role = "ADMIN" }: { userName?: string, role?: any }) {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-[#f8fafc] px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger className="lg:hidden bg-white border border-slate-200 h-10 w-10 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <Menu className="h-5 w-5 text-slate-700" />
            <span className="sr-only">Toggle Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 border-none bg-white">
            <Sidebar role={role} className="border-none" />
          </SheetContent>
        </Sheet>
        {/* Empty left side for desktop as per Figma */}
        <div className="hidden lg:block w-8"></div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500">
          <CalendarDays className="h-4 w-4 text-blue-500" />
          {currentDate}
        </div>

        <Button variant="ghost" size="icon" className="relative hover:bg-transparent">
          <Bell className="h-5 w-5 text-slate-600" />
          <Badge className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px] bg-red-500 text-white border-2 border-[#f8fafc]">
            2
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  )
}
