"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
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
  ShieldCheck,
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
  const searchParams = useSearchParams()

  // Define full routes array tailored for each role
  const routes = [
    { name: "Dashboard", icon: LayoutDashboard, href: `/${role.toLowerCase()}`, roles: ["ADMIN", "STAFF", "CLIENT", "ASSOCIATE"] },
    
    // Admin & Associate & Client specific
    { name: "Work Requests", icon: Briefcase, href: role === "CLIENT" ? "/client?tab=requests" : `/${role.toLowerCase()}/work-requests`, roles: ["ADMIN", "CLIENT", "ASSOCIATE"] },
    { name: "Leads/Enquiries", icon: Users, href: "/admin/enquiries", roles: ["ADMIN"] },
    
    // Staff specific
    
    { name: "All Requests", icon: Briefcase, href: `/staff/requests`, roles: ["STAFF"] },

    // CRM
    { name: "Clients", icon: Users, href: `/${role.toLowerCase()}/clients`, roles: ["ADMIN", "ASSOCIATE"] },
    { name: "KYC Approvals", icon: ShieldCheck, href: `/admin/kyc`, roles: ["ADMIN"] },
    { name: "Associates", icon: UserPlus, href: `/${role.toLowerCase()}/associates`, roles: ["ADMIN"] },
    { name: "Staff", icon: UserCog, href: `/${role.toLowerCase()}/staff`, roles: ["ADMIN"] },
    
    // Finance
    ...(role === "CLIENT" 
      ? [{ name: "Billing", icon: FileText, href: "/client?tab=invoices", roles: ["CLIENT"] }]
      : [
          { name: "Invoices", icon: FileText, href: `/${role.toLowerCase()}/invoices`, roles: ["ADMIN"] },
          { name: "Payments", icon: CreditCard, href: `/${role.toLowerCase()}/payments`, roles: ["ADMIN"] }
        ]
    ),
    
    // Common Ops
    { name: "Reminders", icon: Bell, href: `/${role.toLowerCase()}/reminders`, roles: ["ADMIN", "STAFF"] },
    { name: "Calendar", icon: CalendarDays, href: `/${role.toLowerCase()}/calendar`, roles: ["ADMIN", "STAFF"] },
    
    // Communications & Reports
    { name: "Messages", icon: Bell, href: `/${role.toLowerCase()}/messages`, roles: ["STAFF"] },
    { name: "Reports", icon: BarChart, href: `/${role.toLowerCase()}/reports`, roles: ["ADMIN", "STAFF"] },
    { name: "Profile", icon: UserCog, href: `/${role.toLowerCase()}/profile`, roles: ["STAFF"] },
    { name: "Settings", icon: Settings, href: role === "CLIENT" ? "/client?tab=profile" : `/${role.toLowerCase()}/settings`, roles: ["ADMIN", "STAFF", "CLIENT", "ASSOCIATE"] },
  ]

  // Filter routes by role
  const visibleRoutes = routes.filter((route) => route.roles.includes(role))

  return (
    <div className={cn("flex h-full flex-col bg-[#0B1425] border-r border-[#15233A] text-slate-300", className)}>
      <div className="flex h-16 items-center px-6 mt-4 mb-2">
        <Link href="/" className="flex items-center gap-3 font-bold text-white">
          <div className="bg-white/95 p-1 rounded-md shadow-sm">
            <img src="/ca-logo-cropped.png" alt="CA Logo" className="h-7 w-auto object-contain" />
          </div>
          <span className="text-[16px] leading-tight tracking-tight font-semibold">Shantanu &<br/><span className="font-medium text-blue-400 text-[14px]">Associates</span></span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4 scrollbar-hide">
        <nav className="grid gap-1 px-3">
          {visibleRoutes.map((route) => {
            let isActive = false
            
            if (role === "CLIENT") {
              const currentTab = searchParams?.get("tab") || "dashboard"
              if (route.href.includes("?tab=")) {
                isActive = route.href.includes(`tab=${currentTab}`)
              } else if (route.href === "/client") {
                isActive = currentTab === "dashboard"
              }
            } else {
              if (route.href === `/${role.toLowerCase()}`) {
                isActive = pathname === route.href
              } else {
                isActive = pathname === route.href || pathname.startsWith(`${route.href}/`)
              }
            }

            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#1C2C46] text-white shadow-sm border border-[#2A3F5F]/50"
                    : "text-slate-400 hover:bg-[#15233A] hover:text-slate-200"
                )}
              >
                <route.icon className={cn("h-[18px] w-[18px]", isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
                {route.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 mt-auto border-t border-[#15233A]">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full text-left flex items-center gap-3 rounded-lg p-2 hover:bg-[#15233A] cursor-pointer transition-colors border border-transparent outline-none">
            <Avatar className="h-9 w-9 border border-[#2A3F5F]">
              <AvatarImage src={userImage || ""} alt={userName} className="object-cover" />
              <AvatarFallback className="bg-[#1C2C46] text-blue-400 text-xs font-semibold">
                {userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-slate-200 leading-tight">{userName}</span>
              <span className="text-[11px] font-medium text-slate-500 mt-0.5 capitalize">{role.toLowerCase()}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#0B1425] border-[#15233A] rounded-xl shadow-lg" align="end" side="top">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-slate-400 font-semibold text-xs uppercase tracking-wider">My Account</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#15233A]" />
            <DropdownMenuItem render={<Link href={`/${role.toLowerCase()}/profile`} />} className="cursor-pointer text-[13px] text-slate-300 hover:bg-[#15233A] hover:text-white">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={`/${role.toLowerCase()}/settings`} />} className="cursor-pointer text-[13px] text-slate-300 hover:bg-[#15233A] hover:text-white">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#15233A]" />
            <DropdownMenuItem className="text-red-400 font-medium cursor-pointer text-[13px] hover:bg-red-950/30 hover:text-red-300" onClick={() => signOut({ callbackUrl: `${window.location.origin}/login` })}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}


