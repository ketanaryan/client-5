import { auth } from "@/auth"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building, Receipt, Save } from "lucide-react"

export default async function SettingsPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-50 min-h-[calc(100vh-64px)]">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Firm Settings</h2>
          <p className="text-slate-500 mt-1">Configure global application preferences and defaults.</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <CardTitle className="text-lg">Firm Profile</CardTitle>
                <CardDescription className="mt-1">
                  Update your CA firm's core details. These appear on invoices.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-slate-700 font-semibold">Firm Name</Label>
              <Input id="name" defaultValue="Chartered Accountants Co." className="max-w-md bg-slate-50 focus:bg-white transition-colors" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="gstin" className="text-slate-700 font-semibold">Firm GSTIN</Label>
              <Input id="gstin" defaultValue="27AADCB2230M1Z2" className="max-w-md bg-slate-50 focus:bg-white transition-colors uppercase" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="address" className="text-slate-700 font-semibold">Registered Address</Label>
              <Input id="address" defaultValue="123 Business Park, Mumbai" className="max-w-md bg-slate-50 focus:bg-white transition-colors" />
            </div>
            <div className="pt-2 border-t border-slate-100 mt-6">
              <Button className="mt-4 bg-[#032b4e] hover:bg-[#1c3a5e] text-white shadow-sm font-medium">
                <Save className="h-4 w-4 mr-2" /> Save Profile Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Receipt className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <CardTitle className="text-lg">Billing & Taxes</CardTitle>
                <CardDescription className="mt-1">
                  Configure default tax rates for invoice generation.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="cgst" className="text-slate-700 font-semibold">Default CGST (%)</Label>
                <div className="relative">
                  <Input id="cgst" type="number" defaultValue="9" className="bg-slate-50 focus:bg-white transition-colors pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="sgst" className="text-slate-700 font-semibold">Default SGST (%)</Label>
                <div className="relative">
                  <Input id="sgst" type="number" defaultValue="9" className="bg-slate-50 focus:bg-white transition-colors pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="igst" className="text-slate-700 font-semibold">Default IGST (%)</Label>
              <div className="relative max-w-[50%]">
                <Input id="igst" type="number" defaultValue="18" className="bg-slate-50 focus:bg-white transition-colors pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 mt-6">
              <Button className="mt-4 bg-[#032b4e] hover:bg-[#1c3a5e] text-white shadow-sm font-medium">
                <Save className="h-4 w-4 mr-2" /> Update Tax Rates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
