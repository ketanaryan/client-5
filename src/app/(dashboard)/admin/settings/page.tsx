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

export default async function SettingsPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/login")

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Firm Settings</h2>
          <p className="text-slate-500">Configure global application preferences.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Firm Profile</CardTitle>
            <CardDescription>
              Update your CA firm's core details. These appear on invoices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Firm Name</Label>
              <Input id="name" defaultValue="Chartered Accountants Co." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gstin">Firm GSTIN</Label>
              <Input id="gstin" defaultValue="27AADCB2230M1Z2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Registered Address</Label>
              <Input id="address" defaultValue="123 Business Park, Mumbai" />
            </div>
            <Button className="bg-[#1e293b] hover:bg-[#334155]">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing & Taxes</CardTitle>
            <CardDescription>
              Configure default tax rates for invoice generation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cgst">Default CGST (%)</Label>
              <Input id="cgst" type="number" defaultValue="9" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sgst">Default SGST (%)</Label>
              <Input id="sgst" type="number" defaultValue="9" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="igst">Default IGST (%)</Label>
              <Input id="igst" type="number" defaultValue="18" />
            </div>
            <Button className="bg-[#1e293b] hover:bg-[#334155]">Update Tax Rates</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
