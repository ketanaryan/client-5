"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, Calendar, ArrowRight } from "lucide-react"
import { CreateRequestDialog } from "./CreateRequestDialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { updateWorkRequestStatus } from "@/app/actions/work-requests"

const tabs = ["All", "In Progress", "Awaiting Client", "For Review", "Completed", "Pending"]

export function WorkRequestsTable({ data, clients }: { data: any[], clients: any[] }) {
  const [activeTab, setActiveTab] = useState("All")
  const [search, setSearch] = useState("")

  const filteredData = data.filter((row) => {
    const matchesTab = activeTab === "All" || row.status.replace("_", " ").toLowerCase() === activeTab.toLowerCase()
    const matchesSearch = row.title.toLowerCase().includes(search.toLowerCase()) || 
                          (row.client.companyName || row.client.user.name).toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "IN_PROGRESS": return <Badge className="bg-blue-50 text-blue-600 border border-blue-200 font-medium px-3 py-1 rounded-full shadow-sm hover:bg-blue-100 transition-colors">In Progress</Badge>
      case "AWAITING_CLIENT": return <Badge className="bg-amber-50 text-amber-700 border border-amber-200 font-medium px-3 py-1 rounded-full shadow-sm hover:bg-amber-100 transition-colors">Awaiting Client</Badge>
      case "FOR_REVIEW": return <Badge className="bg-purple-50 text-purple-700 border border-purple-200 font-medium px-3 py-1 rounded-full shadow-sm hover:bg-purple-100 transition-colors">For Review</Badge>
      case "COMPLETED": return <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium px-3 py-1 rounded-full shadow-sm hover:bg-emerald-100 transition-colors">Completed</Badge>
      default: return <Badge className="bg-slate-50 text-slate-500 border border-slate-200 font-medium px-3 py-1 rounded-full shadow-sm hover:bg-slate-100 transition-colors">Pending</Badge>
    }
  }

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "HIGH": return "text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100"
      case "MEDIUM": return "text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100"
      case "LOW": return "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100"
      default: return "text-slate-500"
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full bg-white rounded-[2rem] shadow-sm border border-slate-200/60 overflow-hidden relative">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-slate-100 gap-4 bg-slate-50/30">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Work Requests</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and track all client deliverables.</p>
        </div>
      </div>

      {/* Tabs and Controls */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between px-6 py-4 gap-4 border-b border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto w-full xl:w-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                activeTab === tab 
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full xl:w-auto">
          <div className="relative flex-1 xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search requests..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500 rounded-full shadow-inner h-10 text-[13px]"
            />
          </div>
          <CreateRequestDialog clients={clients} />
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto">
        <Table className="min-w-[1000px]">
          <TableHeader className="bg-slate-50/50 sticky top-0 z-10 backdrop-blur-md">
            <TableRow className="border-b border-slate-100 hover:bg-transparent">
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase pl-6 py-4">ID</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4">Client</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4">Work</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4">Status</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4">Due Date</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4 text-right">Fee</TableHead>
              <TableHead className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase py-4 text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} className="border-b border-slate-100/60 hover:bg-slate-50/80 transition-colors group">
                <TableCell className="pl-6 font-medium text-slate-400 text-xs py-4 font-mono">
                  {row.id.slice(0, 8)}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[14px] text-slate-800">{row.client.companyName || row.client.user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-900 font-medium text-[14px]">{row.title}</span>
                    <span className={`text-[10px] w-fit font-bold tracking-wide ${getPriorityStyle(row.priority)}`}>{row.priority}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  {getStatusBadge(row.status)}
                </TableCell>
                <TableCell className="py-4">
                  {row.dueDate ? (
                    <div className="flex items-center gap-1.5 text-slate-600 text-[13px]">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {new Date(row.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                  ) : <span className="text-slate-400 text-sm">-</span>}
                </TableCell>
                <TableCell className="py-4 text-right">
                  <span className="font-semibold text-slate-800 text-[14px]">
                    {row.feeAmount ? `₹${row.feeAmount.toLocaleString('en-IN')}` : '-'}
                  </span>
                </TableCell>
                <TableCell className="pr-6 text-right py-4">
                  <a href={`/admin/work-requests/${row.id}`} className="inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-blue-600 hover:text-blue-700 transition-colors border border-blue-200 rounded-lg px-3 py-1.5 bg-blue-50 shadow-sm outline-none">Manage &rarr;</a>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-48 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p>No work requests found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

