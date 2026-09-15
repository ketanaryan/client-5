"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Search } from "lucide-react"
import { useState } from "react"

const MOCK_DATA = [
  {
    id: "WR-1024",
    clientName: "ABC Pvt Ltd",
    clientTag: "TaxPro Consultants",
    work: "GST Return \u2014 Aug 2026",
    raisedBy: "TaxPro Consultants",
    assignedTo: "Rahul Sharma",
    status: "In Progress",
    dueDate: "05 Sep 2026",
    fee: "₹8,500",
    priority: "High",
  },
  {
    id: "WR-1023",
    clientName: "XYZ Industries",
    clientTag: "TaxPro Consultants",
    work: "TDS Return \u2014 Q1",
    raisedBy: "TaxPro Consultants",
    assignedTo: "Priya Mehta",
    status: "Awaiting Client",
    dueDate: "03 Sep 2026",
    fee: "₹5,000",
    priority: "Medium",
  },
  {
    id: "WR-1022",
    clientName: "Mr. Raj Kumar",
    clientTag: "",
    work: "ITR \u2014 AY 2026-27",
    raisedBy: "Client",
    assignedTo: "Rahul Sharma",
    status: "Completed",
    dueDate: "31 Aug 2026",
    fee: "₹3,500",
    priority: "High",
  },
  {
    id: "WR-1021",
    clientName: "Shree Enterprises",
    clientTag: "FinServe",
    work: "ROC Compliance",
    raisedBy: "FinServe",
    assignedTo: "Priya Mehta",
    status: "In Progress",
    dueDate: "07 Sep 2026",
    fee: "₹12,000",
    priority: "Medium",
  },
  {
    id: "WR-1020",
    clientName: "ABC Pvt Ltd",
    clientTag: "TaxPro Consultants",
    work: "Bookkeeping \u2014 Aug 2026",
    raisedBy: "TaxPro Consultants",
    assignedTo: "Neha Gupta",
    status: "Not Started",
    dueDate: "10 Sep 2026",
    fee: "₹6,000",
    priority: "Low",
  },
  {
    id: "WR-1016",
    clientName: "PQR Solutions",
    clientTag: "",
    work: "TDS Return \u2014 Q1",
    raisedBy: "Client",
    assignedTo: "Priya Mehta",
    status: "Awaiting Client",
    dueDate: "02 Sep 2026",
    fee: "₹4,500",
    priority: "Medium",
  },
]

export default function WorkRequestsPage() {
  const [activeTab, setActiveTab] = useState("All")
  
  const tabs = ["All", "In Progress", "Awaiting Client", "For Review", "Completed", "Not Started"]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress": return <Badge className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 font-medium px-3 py-1 rounded-full shadow-sm">{status}</Badge>
      case "Awaiting Client": return <Badge className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium px-3 py-1 rounded-full shadow-sm">{status}</Badge>
      case "Completed": return <Badge className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 font-medium px-3 py-1 rounded-full shadow-sm">{status}</Badge>
      case "Not Started": return <Badge className="bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 font-medium px-3 py-1 rounded-full shadow-sm">{status}</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-500 font-semibold"
      case "Medium": return "text-blue-600 font-semibold"
      case "Low": return "text-emerald-500 font-semibold"
      default: return "text-slate-500 font-semibold"
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Top Header Section inside the card */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 border-b border-slate-100 gap-4">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Work Requests</h2>
        <div className="flex items-center text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2 relative">
            <span className="h-2 w-2 rounded-full bg-red-500 absolute -top-1 -right-2"></span>
          </div>
        </div>
      </div>

      {/* Tabs and Controls */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between px-4 md:px-6 py-4 gap-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-[#1e3a8a] text-white shadow-md shadow-blue-900/10" 
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
              className="pl-9 bg-white border-slate-200 focus-visible:ring-blue-500 rounded-lg shadow-sm"
            />
          </div>
          <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white shadow-md whitespace-nowrap rounded-lg">
            + New Request
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto">
        <Table className="min-w-[1000px]">
          <TableHeader className="bg-white sticky top-0 z-10">
            <TableRow className="border-b border-slate-200 hover:bg-transparent">
              <TableHead className="text-slate-400 font-semibold text-xs tracking-wider uppercase pl-6 py-4">ID</TableHead>
              <TableHead className="text-slate-400 font-semibold text-xs tracking-wider uppercase py-4">Client</TableHead>
              <TableHead className="text-slate-400 font-semibold text-xs tracking-wider uppercase py-4">Work</TableHead>
              <TableHead className="text-slate-400 font-semibold text-xs tracking-wider uppercase py-4">Raised By</TableHead>
              <TableHead className="text-slate-400 font-semibold text-xs tracking-wider uppercase py-4">Assigned To</TableHead>
              <TableHead className="text-slate-400 font-semibold text-xs tracking-wider uppercase py-4">Status</TableHead>
              <TableHead className="text-slate-400 font-semibold text-xs tracking-wider uppercase py-4">Due Date</TableHead>
              <TableHead className="text-slate-400 font-semibold text-xs tracking-wider uppercase py-4">Fee</TableHead>
              <TableHead className="text-slate-400 font-semibold text-xs tracking-wider uppercase py-4">Priority</TableHead>
              <TableHead className="text-slate-400 font-semibold text-xs tracking-wider uppercase py-4 text-right pr-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_DATA.map((row) => (
              <TableRow key={row.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
                <TableCell className="pl-6 font-medium text-blue-600 text-sm py-4">
                  {row.id}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">{row.clientName}</span>
                    {row.clientTag && <span className="text-xs text-slate-500 mt-0.5">{row.clientTag}</span>}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-slate-700 font-medium">{row.work}</span>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-slate-600">{row.raisedBy}</span>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-slate-600">{row.assignedTo}</span>
                </TableCell>
                <TableCell className="py-4">
                  {getStatusBadge(row.status)}
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-slate-600 text-sm">{row.dueDate}</span>
                </TableCell>
                <TableCell className="py-4">
                  <span className="font-semibold text-slate-800">{row.fee}</span>
                </TableCell>
                <TableCell className="py-4">
                  <Badge variant="outline" className={`border-none bg-transparent shadow-none px-0 ${getPriorityStyle(row.priority)}`}>
                    {row.priority}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6 text-right py-4">
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors border border-slate-200 rounded-md px-3 py-1.5 bg-white shadow-sm hover:border-blue-200">
                    {row.assignedTo} <ChevronDown className="h-3 w-3 text-slate-400" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
