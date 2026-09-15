"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  UserPlus,
  UserCog,
  FileText,
  CreditCard,
  Bell,
  BarChart,
  CalendarDays,
  Settings,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
type Role = "ADMIN" | "STAFF" | "CLIENT" | "ASSOCIATE"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: Role
  userName?: string
}

export function Sidebar({ className, role = "ADMIN", userName = "User" }: SidebarProps) {
  const pathname = usePathname()

  // Define full routes array tailored for each role
  const routes = [
    { name: "Dashboard", icon: LayoutDashboard, href: `/${role.toLowerCase()}`, roles: ["ADMIN", "STAFF", "CLIENT", "ASSOCIATE"] },
    
    // Admin & Associate & Client specific
    { name: "Work Requests", icon: Briefcase, href: `/${role.toLowerCase()}/work-requests`, roles: ["ADMIN", "CLIENT", "ASSOCIATE"] },
    { name: "Leads/Enquiries", icon: Users, href: "/admin/enquiries", roles: ["ADMIN"] },
    
    // Staff specific
    { name: "My Work", icon: FileText, href: `/staff/my-work`, roles: ["STAFF"] },
    { name: "All Requests", icon: Briefcase, href: `/staff/requests`, roles: ["STAFF"] },

    // CRM
    { name: "Clients", icon: Users, href: `/${role.toLowerCase()}/clients`, roles: ["ADMIN", "ASSOCIATE"] },
    { name: "Associates", icon: UserPlus, href: `/${role.toLowerCase()}/associates`, roles: ["ADMIN"] },
    { name: "Staff", icon: UserCog, href: `/${role.toLowerCase()}/staff`, roles: ["ADMIN"] },
    
    // Finance
    { name: "Invoices", icon: FileText, href: `/${role.toLowerCase()}/invoices`, roles: ["ADMIN", "CLIENT"] },
    { name: "Payments", icon: CreditCard, href: `/${role.toLowerCase()}/payments`, roles: ["ADMIN", "CLIENT"] },
    
    // Common Ops
    { name: "Reminders", icon: Bell, href: `/${role.toLowerCase()}/reminders`, roles: ["ADMIN", "STAFF"] },
    { name: "Calendar", icon: CalendarDays, href: `/${role.toLowerCase()}/calendar`, roles: ["ADMIN", "STAFF"] },
    
    // Communications & Reports
    { name: "Messages", icon: Bell, href: `/${role.toLowerCase()}/messages`, roles: ["STAFF"] },
    { name: "Reports", icon: BarChart, href: `/${role.toLowerCase()}/reports`, roles: ["ADMIN", "STAFF"] },
    { name: "Profile", icon: UserCog, href: `/${role.toLowerCase()}/profile`, roles: ["STAFF"] },
    { name: "Settings", icon: Settings, href: `/${role.toLowerCase()}/settings`, roles: ["ADMIN", "STAFF", "CLIENT", "ASSOCIATE"] },
  ]

  // Filter routes by role
  const visibleRoutes = routes.filter((route) => route.roles.includes(role))

  return (
    <div className={cn("flex h-full flex-col bg-[#1e293b] text-slate-300", className)}>
      <div className="flex h-16 items-center px-6 mt-4 mb-2">
        <Link href="/" className="flex items-center gap-3 font-bold text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white font-semibold text-sm shadow-sm">
            CA
          </div>
          <span className="text-lg leading-tight tracking-wide font-medium">Chartered<br/>Accountants</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4 scrollbar-hide">
        <nav className="grid gap-1 px-3">
          {visibleRoutes.map((route) => {
            const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`)
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <route.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400")} />
                {route.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full text-left flex items-center gap-3 rounded-xl p-3 hover:bg-slate-800 cursor-pointer transition-colors border border-transparent hover:border-slate-700 outline-none">
            <Avatar className="h-10 w-10 border-2 border-slate-700">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-slate-700 text-white">
                {userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white leading-tight">{userName}</span>
              <span className="text-xs text-blue-400 mt-0.5 capitalize">{role.toLowerCase()}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white border-slate-200" align="end" side="top">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => signOut({ callbackUrl: "/login" })}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
