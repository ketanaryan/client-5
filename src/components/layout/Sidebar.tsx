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
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
type Role = "ADMIN" | "STAFF" | "CLIENT" | "ASSOCIATE"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: Role
  userName?: string
  userImage?: string | null
}

export function Sidebar({ className, role = "ADMIN", userName = "User", userImage = null }: SidebarProps) {
  const pathname = usePathname()

  // Define full routes array tailored for each role
  const routes = [
    { name: "Dashboard", icon: LayoutDashboard, href: `/${role.toLowerCase()}`, roles: ["ADMIN", "STAFF", "CLIENT", "ASSOCIATE"] },
    
    // Admin & Associate & Client specific
    { name: "Work Requests", icon: Briefcase, href: role === "CLIENT" ? "/client?tab=requests" : `/${role.toLowerCase()}/work-requests`, roles: ["ADMIN", "CLIENT", "ASSOCIATE"] },
    { name: "Leads/Enquiries", icon: Users, href: "/admin/enquiries", roles: ["ADMIN"] },
    
    // Staff specific
    { name: "My Work", icon: FileText, href: `/staff/my-work`, roles: ["STAFF"] },
    { name: "All Requests", icon: Briefcase, href: `/staff/requests`, roles: ["STAFF"] },

    // CRM
    { name: "Clients", icon: Users, href: `/${role.toLowerCase()}/clients`, roles: ["ADMIN", "ASSOCIATE"] },
    { name: "Associates", icon: UserPlus, href: `/${role.toLowerCase()}/associates`, roles: ["ADMIN"] },
    { name: "Staff", icon: UserCog, href: `/${role.toLowerCase()}/staff`, roles: ["ADMIN"] },
    
    // Finance
    { name: "Invoices", icon: FileText, href: role === "CLIENT" ? "/client?tab=invoices" : `/${role.toLowerCase()}/invoices`, roles: ["ADMIN", "CLIENT"] },
    { name: "Payments", icon: CreditCard, href: role === "CLIENT" ? "/client?tab=invoices" : `/${role.toLowerCase()}/payments`, roles: ["ADMIN", "CLIENT"] },
    
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
    <div className={cn("flex h-full flex-col bg-white border-r border-slate-200 text-slate-700", className)}>
      <div className="flex h-16 items-center px-6 mt-4 mb-2">
        <Link href="/" className="flex items-center gap-3 font-bold text-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-sm">
            CA
          </div>
          <span className="text-[17px] leading-tight tracking-tight font-semibold">Chartered<br/><span className="font-medium text-slate-500">Accountants</span></span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4 scrollbar-hide">
        <nav className="grid gap-1.5 px-4">
          {visibleRoutes.map((route) => {
            const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`)
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-all duration-200",
                  isActive
                    ? "bg-slate-100 text-slate-900 shadow-sm border border-slate-200/60"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                )}
              >
                <route.icon className={cn("h-[18px] w-[18px]", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                {route.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 mt-auto border-t border-slate-100">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full text-left flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 cursor-pointer transition-colors border border-transparent outline-none">
            <Avatar className="h-9 w-9 border border-slate-200">
              <AvatarImage src={userImage || ""} alt={userName} className="object-cover" />
              <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-semibold">
                {userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-slate-900 leading-tight">{userName}</span>
              <span className="text-[11px] font-medium text-slate-500 mt-0.5 capitalize">{role.toLowerCase()}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white border-slate-200 rounded-xl shadow-lg" align="end" side="top">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-slate-800 font-semibold text-xs uppercase tracking-wider">My Account</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem render={<Link href={`/${role.toLowerCase()}/profile`} />} className="cursor-pointer text-[13px] text-slate-700 hover:bg-slate-50">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={`/${role.toLowerCase()}/settings`} />} className="cursor-pointer text-[13px] text-slate-700 hover:bg-slate-50">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="text-red-600 font-medium cursor-pointer text-[13px] hover:bg-red-50" onClick={() => signOut({ callbackUrl: window?.location?.origin + "/login" })}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
