"use client"

import { Menu, CalendarDays, Bell, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "./Sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { markAllNotificationsRead } from "@/app/actions/users"
import { Suspense } from "react"

export function Header({ role = "ADMIN", userName = "User", userImage = null, notifications = [] }: { userName?: string, role?: any, userImage?: string | null, notifications?: any[] }) {
  const router = useRouter()
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-[#EBF1F8] px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger className="lg:hidden bg-white border border-slate-200 h-10 w-10 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <Menu className="h-5 w-5 text-slate-700" />
            <span className="sr-only">Toggle Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 border-none bg-white">
            <Suspense fallback={<div className="w-full h-full bg-white"></div>}>
              <Sidebar role={role} userName={userName} userImage={userImage} className="border-none" />
            </Suspense>
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

        <DropdownMenu>
          <DropdownMenuTrigger className="relative hover:bg-slate-100 rounded-full h-10 w-10 flex items-center justify-center outline-none transition-colors border-none cursor-pointer">
            <Bell className="h-[22px] w-[22px] text-slate-600" />
            {unreadCount > 0 && (
                <Badge className="absolute right-1 top-1.5 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px] bg-red-500 text-white border-2 border-[#EBF1F8]">
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 bg-white border-slate-200 rounded-xl shadow-lg p-0" align="end" sideOffset={8}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <span className="font-semibold text-slate-800 text-sm">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline" onClick={async () => {
                  try { await markAllNotificationsRead() } catch (e) { console.error(e) }
                }}>Mark all as read</span>
              )}
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-slate-500">
                  No new notifications
                </div>
              ) : (
                notifications.map((notif: any) => (
                  <div key={notif.id} className={`flex flex-col gap-1 p-4 border-b border-slate-50 hover:bg-slate-50/80 cursor-pointer transition-colors ${notif.isRead ? 'opacity-70' : 'bg-blue-50/30'}`} onClick={() => { if(notif.link) router.push(notif.link) }}>
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-sm ${notif.isRead ? 'text-slate-700 font-medium' : 'text-slate-900 font-semibold'}`}>{notif.title}</span>
                      {!notif.isRead && <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{notif.message}</p>
                    <span className="text-[10px] text-slate-400 mt-1">{new Date(notif.createdAt).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </div>
            <div className="p-2 border-t border-slate-100">
              <Button variant="ghost" className="w-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 h-8">
                View All Notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
