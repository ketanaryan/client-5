"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function RevenueChart({ data }: { data: any[] }) {
  if (!data || data.every((d) => d.revenue === 0)) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 text-sm">
        No revenue data for the last 6 months.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `₹${value.toLocaleString()}`} />
        <Tooltip 
          cursor={{ fill: '#f1f5f9' }}
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
        />
        <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
      </BarChart>
    </ResponsiveContainer>
  )
}
