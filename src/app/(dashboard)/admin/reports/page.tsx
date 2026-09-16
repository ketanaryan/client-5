"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Activity, BarChart as BarChartIcon } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', revenue: 400000 },
  { name: 'Feb', revenue: 300000 },
  { name: 'Mar', revenue: 550000 },
  { name: 'Apr', revenue: 450000 },
  { name: 'May', revenue: 700000 },
  { name: 'Jun', revenue: 650000 },
  { name: 'Jul', revenue: 850000 },
  { name: 'Aug', revenue: 1124500 },
]

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-50 min-h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Analytics & Reports</h2>
          <p className="text-slate-500 mt-1">Firm performance, revenue tracking, and operational efficiency.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <IndianRupeeIcon className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">₹11,24,500</div>
            <p className="text-sm font-medium text-emerald-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +20.1% <span className="text-slate-500 ml-1 font-normal">from last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Active Clients</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">+2,350</div>
            <p className="text-sm font-medium text-emerald-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +180 <span className="text-slate-500 ml-1 font-normal">new this quarter</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Jobs Completed</CardTitle>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <Activity className="h-4 w-4 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">12,234</div>
            <p className="text-sm font-medium text-emerald-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +19% <span className="text-slate-500 ml-1 font-normal">efficiency rate</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Outstanding Dues</CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <BarChartIcon className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">₹1,45,231</div>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Across 12 pending invoices
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 grid-cols-1">
        <Card className="col-span-1 shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 rounded-t-xl pb-4">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              Revenue Overview (2026)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b' }} 
                  tickFormatter={(value) => `₹${value / 100000}L`}
                  dx={-10}
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function IndianRupeeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="M6 13h8.5a5.5 5.5 0 0 0 0-11" />
      <path d="M13 13l-7 8" />
    </svg>
  )
}
