"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Circle, AlertCircle, FileText, IndianRupee, MessageSquare, User, Check, CreditCard, Upload } from "lucide-react"

export default function ClientPortal() {
  const [utrNumber, setUtrNumber] = useState("")

  return (
    <div className="flex flex-1 flex-col h-full bg-white overflow-hidden rounded-xl border border-slate-200/60 shadow-sm mx-auto w-full max-w-7xl my-2 sm:my-4">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/30 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Client Portal</h2>
          <p className="text-sm text-slate-500 mt-1">Welcome back, ABC Pvt Ltd.</p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="flex flex-col h-full">
        <div className="px-6 md:px-8 border-b border-slate-100">
          <TabsList className="bg-transparent h-14 w-full justify-start gap-6 p-0">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-1 text-[14px] font-medium text-slate-500 data-[state=active]:text-slate-900 transition-none">Overview</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-1 text-[14px] font-medium text-slate-500 data-[state=active]:text-slate-900 transition-none">My Requests</TabsTrigger>
            <TabsTrigger value="invoices" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-1 text-[14px] font-medium text-slate-500 data-[state=active]:text-slate-900 transition-none">Invoices & Payments</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-1 text-[14px] font-medium text-slate-500 data-[state=active]:text-slate-900 transition-none">Document Vault</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-1 text-[14px] font-medium text-slate-500 data-[state=active]:text-slate-900 transition-none">Profile</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto p-6 md:p-8 pb-12">
          {/* DASHBOARD TAB */}
          <TabsContent value="dashboard" className="m-0 space-y-6">
            <div className="bg-red-50/50 border border-red-100 rounded-xl p-5 flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-red-700">Outstanding Balance: ₹15,000</h4>
                <p className="text-[13px] text-red-600/80 mt-1">You have 1 overdue invoice. Please clear the dues to avoid delay in services.</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto shrink-0 bg-white border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => document.querySelector('[data-value="invoices"]')?.dispatchEvent(new MouseEvent('click', {bubbles:true}))}>Pay Now</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[13px] text-slate-500 font-medium">Active Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">2</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[13px] text-slate-500 font-medium">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">15</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[13px] text-slate-500 font-medium">Pending Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">1</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MY REQUESTS TAB */}
          <TabsContent value="requests" className="m-0 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-slate-900">Live Status Tracking</h3>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-none">+ Raise New Request</Button>
            </div>
            
            <div className="grid gap-6">
              <Card className="shadow-sm border-slate-200/60">
                <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-[15px] font-semibold text-slate-900">GST Return - Aug 2026</CardTitle>
                      <CardDescription className="mt-1 text-[13px]">Ref: WR-1024 • Assigned to: TaxPro Consultants</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-medium border-0 px-2.5">In Progress</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-8 pb-8">
                  <div className="relative pl-4">
                    <div className="absolute left-[27px] top-2 bottom-2 w-[1px] bg-slate-200" />
                    <ul className="space-y-8 relative z-10">
                      <li className="flex gap-5">
                        <div className="bg-white rounded-full p-1"><CheckCircle2 className="h-[22px] w-[22px] text-emerald-500" /></div>
                        <div className="flex flex-col mt-0.5"><p className="font-semibold text-slate-900 text-[14px] leading-none">Request Raised</p><p className="text-[12px] text-slate-500 mt-1.5">01 Sep 2026</p></div>
                      </li>
                      <li className="flex gap-5">
                        <div className="bg-white rounded-full p-1"><CheckCircle2 className="h-[22px] w-[22px] text-emerald-500" /></div>
                        <div className="flex flex-col mt-0.5"><p className="font-semibold text-slate-900 text-[14px] leading-none">Documents Verified</p><p className="text-[12px] text-slate-500 mt-1.5">02 Sep 2026</p></div>
                      </li>
                      <li className="flex gap-5">
                        <div className="bg-white rounded-full p-1 relative"><div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div><Circle className="h-[22px] w-[22px] text-blue-600 fill-blue-50 relative z-10" /></div>
                        <div className="flex flex-col mt-0.5"><p className="font-semibold text-blue-700 text-[14px] leading-none">Drafting Return</p><p className="text-[12px] text-blue-600/80 mt-1.5">Currently working on this step</p></div>
                      </li>
                      <li className="flex gap-5 opacity-60">
                        <div className="bg-white rounded-full p-1"><Circle className="h-[22px] w-[22px] text-slate-300" /></div>
                        <div className="flex flex-col mt-0.5"><p className="font-medium text-slate-500 text-[14px] leading-none">Awaiting Client Approval</p></div>
                      </li>
                      <li className="flex gap-5 opacity-60">
                        <div className="bg-white rounded-full p-1"><Circle className="h-[22px] w-[22px] text-slate-300" /></div>
                        <div className="flex flex-col mt-0.5"><p className="font-medium text-slate-500 text-[14px] leading-none">Filed Successfully</p></div>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* INVOICES & PAYMENTS TAB */}
          <TabsContent value="invoices" className="m-0 space-y-6">
            <Card className="shadow-sm border-slate-200/60">
              <CardHeader className="border-b border-slate-100 bg-slate-50/30">
                <CardTitle className="text-[15px] font-semibold text-slate-800">Unpaid Invoices</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Inv #</TableHead>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Service</TableHead>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Amount</TableHead>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Status</TableHead>
                      <TableHead className="text-right font-medium text-slate-500 text-xs uppercase tracking-wider">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-slate-50/40">
                      <TableCell className="font-medium text-blue-600 text-[14px]">INV-2026-042</TableCell>
                      <TableCell className="text-[14px] text-slate-700">Audit FY 24-25</TableCell>
                      <TableCell className="font-semibold text-slate-900 text-[14px]">₹15,000</TableCell>
                      <TableCell><Badge variant="secondary" className="bg-red-50 text-red-600 hover:bg-red-50 font-medium border-0 px-2">Overdue</Badge></TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-none h-8 rounded-md px-3 text-xs inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                            <IndianRupee className="h-3 w-3"/> Pay Now
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md border-slate-200 p-0 overflow-hidden">
                            <DialogHeader className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
                              <DialogTitle className="text-xl">Make Payment</DialogTitle>
                              <DialogDescription className="text-slate-500">Scan QR or transfer to bank, then upload UTR.</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center gap-6 p-6">
                              <div className="w-40 h-40 bg-white border border-slate-200 shadow-sm flex items-center justify-center rounded-xl">
                                <span className="text-slate-400 text-sm font-medium">[ UPI QR CODE ]</span>
                              </div>
                              <div className="w-full bg-slate-50/50 p-4 rounded-xl text-[13px] space-y-2.5 border border-slate-100 text-slate-600">
                                <p className="flex justify-between"><span className="text-slate-500">Bank:</span> <strong className="text-slate-900 font-medium">HDFC Bank Ltd</strong></p>
                                <p className="flex justify-between"><span className="text-slate-500">A/C Name:</span> <strong className="text-slate-900 font-medium">CA ABC & CO.</strong></p>
                                <p className="flex justify-between"><span className="text-slate-500">A/C No:</span> <strong className="text-slate-900 font-mono">50200012345678</strong></p>
                                <p className="flex justify-between"><span className="text-slate-500">IFSC:</span> <strong className="text-slate-900 font-mono">HDFC0001234</strong></p>
                              </div>
                              <div className="w-full space-y-4">
                                <div className="space-y-1.5">
                                  <label className="text-[13px] font-medium text-slate-700">UTR / Transaction ID</label>
                                  <Input className="h-10 border-slate-200 focus-visible:ring-blue-500" placeholder="Enter 12-digit UTR" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[13px] font-medium text-slate-700">Payment Screenshot</label>
                                  <div className="flex items-center justify-center w-full h-28 border border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                                    <div className="flex flex-col items-center text-slate-500">
                                      <Upload className="h-6 w-6 mb-2 text-slate-400" />
                                      <span className="text-xs font-medium">Click to upload</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                              <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-[14px] font-medium shadow-sm" onClick={() => alert("Payment Submitted for Verification!")}>Submit Payment Details</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200/60 mt-6">
              <CardHeader className="border-b border-slate-100 bg-slate-50/30">
                <CardTitle className="text-[15px] font-semibold text-slate-800">Payment History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Date</TableHead>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Amount</TableHead>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">UTR</TableHead>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-slate-50/40">
                      <TableCell className="text-[14px] text-slate-700">15 Aug 2026</TableCell>
                      <TableCell className="font-medium text-slate-900 text-[14px]">₹8,500</TableCell>
                      <TableCell className="font-mono text-[13px] text-slate-500">UTIB000123456</TableCell>
                      <TableCell><Badge variant="secondary" className="bg-emerald-50 text-emerald-700 font-medium border-0 px-2">Verified</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DOCUMENT VAULT TAB */}
          <TabsContent value="documents" className="m-0 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-slate-900">Secure Document Vault</h3>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-none"><Upload className="h-4 w-4 mr-2"/> Upload</Button>
            </div>
            <Card className="shadow-sm border-slate-200/60">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Document Name</TableHead>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Uploaded By</TableHead>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider">Date</TableHead>
                      <TableHead className="font-medium text-slate-500 text-xs uppercase tracking-wider text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-slate-50/40">
                      <TableCell className="font-medium text-slate-900 text-[14px] flex items-center gap-3"><FileText className="h-4 w-4 text-blue-500"/> ITR-V_2025.pdf</TableCell>
                      <TableCell className="text-[14px] text-slate-600">Rahul Sharma (Staff)</TableCell>
                      <TableCell className="text-[14px] text-slate-500">05 Sep 2026</TableCell>
                      <TableCell className="text-right"><Button variant="outline" size="sm" className="h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 text-slate-700">Download</Button></TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-slate-50/40">
                      <TableCell className="font-medium text-slate-900 text-[14px] flex items-center gap-3"><FileText className="h-4 w-4 text-blue-500"/> BankStatement_Aug.pdf</TableCell>
                      <TableCell className="text-[14px] text-slate-600">You</TableCell>
                      <TableCell className="text-[14px] text-slate-500">01 Sep 2026</TableCell>
                      <TableCell className="text-right"><Button variant="outline" size="sm" className="h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 text-slate-700">Download</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PROFILE TAB */}
          <TabsContent value="profile" className="m-0 space-y-6">
             <Card className="shadow-sm border-slate-200/60 overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-center text-blue-600 text-xl font-bold tracking-tight">ABC</div>
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-xl">ABC Pvt Ltd</CardTitle>
                    <CardDescription className="text-[14px]">client@abcpvtltd.com</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 p-8">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-slate-500 uppercase tracking-wider">Company PAN</label>
                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 font-mono text-[14px] text-slate-900">ABCDE1234F</div>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-slate-500 uppercase tracking-wider">GSTIN</label>
                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 font-mono text-[14px] text-slate-900">27ABCDE1234F1Z5</div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[13px] font-medium text-slate-500 uppercase tracking-wider">Registered Address</label>
                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 text-[14px] text-slate-900 leading-relaxed">123 Business Park, Andheri East, Mumbai, Maharashtra 400069</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  )
}
