"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Circle, AlertCircle, FileText, IndianRupee, MessageSquare, User, Check, CreditCard, Upload } from "lucide-react"

export default function ClientPortal() {
  const [utrNumber, setUtrNumber] = useState("")

  return (
    <div className="flex flex-1 flex-col h-full bg-[#f8fafc] overflow-hidden m-4 md:m-6 lg:m-8 rounded-xl border border-slate-200">
      <div className="p-4 md:p-6 border-b border-slate-200 bg-white">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Client Portal</h2>
        <p className="text-sm text-slate-500">Welcome back, ABC Pvt Ltd.</p>
      </div>

      <Tabs defaultValue="dashboard" className="flex flex-col h-full">
        <div className="px-6 border-b border-slate-200 bg-slate-50/50">
          <TabsList className="bg-transparent h-12 w-full justify-start gap-4">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Dashboard</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">My Requests</TabsTrigger>
            <TabsTrigger value="invoices" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Invoices & Payments</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Document Vault</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">Profile</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-6">
          {/* DASHBOARD TAB */}
          <TabsContent value="dashboard" className="m-0 space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-4 shadow-sm">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800">Outstanding Balance: ₹15,000</h4>
                <p className="text-sm text-red-600 mt-1">You have 1 overdue invoice. Please clear the dues to avoid delay in services.</p>
              </div>
              <Button variant="destructive" className="ml-auto shrink-0 shadow-sm" onClick={() => document.querySelector('[data-value="invoices"]')?.dispatchEvent(new MouseEvent('click', {bubbles:true}))}>Pay Now</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="shadow-sm border-slate-200"><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500 font-medium">Active Requests</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-slate-800">2</div></CardContent></Card>
              <Card className="shadow-sm border-slate-200"><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500 font-medium">Completed</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-slate-800">15</div></CardContent></Card>
              <Card className="shadow-sm border-slate-200"><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500 font-medium">Pending Invoices</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-slate-800">1</div></CardContent></Card>
            </div>
          </TabsContent>

          {/* MY REQUESTS TAB */}
          <TabsContent value="requests" className="m-0 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Live Status Tracking</h3>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">+ Raise New Request</Button>
            </div>
            
            <div className="grid gap-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="bg-slate-50 border-b border-slate-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">GST Return - Aug 2026</CardTitle>
                      <CardDescription>Ref: WR-1024 • Assigned to: TaxPro Consultants</CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 shadow-none">In Progress</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="relative">
                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200" />
                    <ul className="space-y-6 relative z-10">
                      <li className="flex gap-4">
                        <div className="bg-white rounded-full p-1"><CheckCircle2 className="h-5 w-5 text-emerald-500" /></div>
                        <div><p className="font-semibold text-slate-800 text-sm">Request Raised</p><p className="text-xs text-slate-500">01 Sep 2026</p></div>
                      </li>
                      <li className="flex gap-4">
                        <div className="bg-white rounded-full p-1"><CheckCircle2 className="h-5 w-5 text-emerald-500" /></div>
                        <div><p className="font-semibold text-slate-800 text-sm">Documents Verified</p><p className="text-xs text-slate-500">02 Sep 2026</p></div>
                      </li>
                      <li className="flex gap-4">
                        <div className="bg-white rounded-full p-1 animate-pulse"><Circle className="h-5 w-5 text-blue-500 fill-blue-100" /></div>
                        <div><p className="font-semibold text-blue-700 text-sm">Drafting Return</p><p className="text-xs text-blue-500">Currently working on this step</p></div>
                      </li>
                      <li className="flex gap-4">
                        <div className="bg-white rounded-full p-1"><Circle className="h-5 w-5 text-slate-300" /></div>
                        <div><p className="font-medium text-slate-400 text-sm">Awaiting Client Approval</p></div>
                      </li>
                      <li className="flex gap-4">
                        <div className="bg-white rounded-full p-1"><Circle className="h-5 w-5 text-slate-300" /></div>
                        <div><p className="font-medium text-slate-400 text-sm">Filed Successfully</p></div>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* INVOICES & PAYMENTS TAB */}
          <TabsContent value="invoices" className="m-0 space-y-6">
            <Card className="shadow-sm border-slate-200">
              <CardHeader><CardTitle>Unpaid Invoices</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Inv #</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV-2026-042</TableCell>
                      <TableCell>Audit FY 24-25</TableCell>
                      <TableCell className="font-bold">₹15,000</TableCell>
                      <TableCell><Badge variant="destructive" className="shadow-none">Overdue</Badge></TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 shadow-sm"><IndianRupee className="h-3 w-3 mr-1"/> Pay Now</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Make Payment</DialogTitle>
                              <DialogDescription>Scan QR or transfer to bank, then upload UTR.</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center gap-4 py-4">
                              <div className="w-40 h-40 bg-slate-100 border border-slate-200 flex items-center justify-center rounded-lg">
                                <span className="text-slate-400 text-sm">[ UPI QR CODE ]</span>
                              </div>
                              <div className="w-full bg-slate-50 p-4 rounded-lg text-sm space-y-2 border border-slate-200">
                                <p><strong>Bank:</strong> HDFC Bank Ltd</p>
                                <p><strong>A/C Name:</strong> CA ABC & CO.</p>
                                <p><strong>A/C No:</strong> 50200012345678</p>
                                <p><strong>IFSC:</strong> HDFC0001234</p>
                              </div>
                              <div className="w-full space-y-3">
                                <div>
                                  <label className="text-sm font-medium">UTR / Transaction ID</label>
                                  <Input placeholder="Enter 12-digit UTR" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Payment Screenshot</label>
                                  <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer">
                                    <div className="flex flex-col items-center text-slate-500">
                                      <Upload className="h-6 w-6 mb-1" />
                                      <span className="text-xs">Click to upload</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => alert("Payment Submitted for Verification!")}>Submit Payment Details</Button>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardHeader><CardTitle>Payment History</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>UTR</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>15 Aug 2026</TableCell>
                      <TableCell>₹8,500</TableCell>
                      <TableCell className="font-mono text-xs text-slate-500">UTIB000123456</TableCell>
                      <TableCell><Badge className="bg-emerald-50 text-emerald-600 border-none shadow-none">Verified</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DOCUMENT VAULT TAB */}
          <TabsContent value="documents" className="m-0 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Secure Document Vault</h3>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm"><Upload className="h-4 w-4 mr-2"/> Upload Document</Button>
            </div>
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-blue-500"/> ITR-V_2025.pdf</TableCell>
                      <TableCell>Rahul Sharma (Staff)</TableCell>
                      <TableCell>05 Sep 2026</TableCell>
                      <TableCell className="text-right"><Button variant="outline" size="sm">Download</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-blue-500"/> BankStatement_Aug.pdf</TableCell>
                      <TableCell>You</TableCell>
                      <TableCell>01 Sep 2026</TableCell>
                      <TableCell className="text-right"><Button variant="outline" size="sm">Download</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PROFILE TAB */}
          <TabsContent value="profile" className="m-0 space-y-6">
             <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">ABC</div>
                  <div>
                    <CardTitle>ABC Pvt Ltd</CardTitle>
                    <CardDescription>client@abcpvtltd.com</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-500">Company PAN</label>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-sm">ABCDE1234F</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-500">GSTIN</label>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-sm">27ABCDE1234F1Z5</div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-500">Registered Address</label>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm">123 Business Park, Andheri East, Mumbai, Maharashtra 400069</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  )
}
