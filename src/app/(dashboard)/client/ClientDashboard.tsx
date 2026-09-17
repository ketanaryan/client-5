"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Circle, AlertCircle, FileText, IndianRupee, MessageSquare, User, Check, CreditCard, Upload, Camera, Loader2 } from "lucide-react"
import Image from "next/image"
import { updateUserAvatar } from "@/app/actions/users"
import { toast } from "sonner"
import { createClientWorkRequest } from "@/app/actions/work-requests"
import { submitClientPayment } from "@/app/actions/payments"
import { uploadClientDocument } from "@/app/actions/documents"

export default function ClientPortal({ user, profile, workRequests, invoices, documents }: { user: any, profile: any, workRequests: any[], invoices: any[], documents?: any[] }) {
  const [utrNumber, setUtrNumber] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "dashboard"
  const [activeTab, setActiveTab] = useState(tab)
  
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  
  const [avatar, setAvatar] = useState<string | null>(user.image || null)
  const [kycLoading, setKycLoading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const documentUploadRef = useRef<HTMLInputElement>(null)
  const [uploadingDoc, setUploadingDoc] = useState(false)

  const [isRaiseRequestOpen, setIsRaiseRequestOpen] = useState(false)
  const [creatingRequest, setCreatingRequest] = useState(false)
  const [submittingPayment, setSubmittingPayment] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB")
      return
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      const base64String = event.target?.result as string
      setAvatar(base64String)
      setLoadingAvatar(true)
      try {
        await updateUserAvatar(base64String)
      } catch (error) {
        console.error(error)
        alert("Failed to update avatar")
      }
      setLoadingAvatar(false)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    setActiveTab(tab)
  }, [tab])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/client?tab=${value}`)
  }

  return (
    <div className="flex flex-1 flex-col h-full bg-white overflow-hidden rounded-xl border border-slate-200/60 shadow-sm mx-auto w-full max-w-7xl my-2 sm:my-4">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/30 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Client Portal</h2>
          <p className="text-sm text-slate-500 mt-1">Welcome back, {profile?.companyName || user.name}.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col h-full">
        <div className="px-6 md:px-8 border-b border-slate-100">
          <TabsList className="bg-transparent h-14 w-full justify-start gap-6 p-0">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-1 text-[14px] font-medium text-slate-500 data-[state=active]:text-slate-900 transition-none">Overview</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-1 text-[14px] font-medium text-slate-500 data-[state=active]:text-slate-900 transition-none">My Requests</TabsTrigger>
            <TabsTrigger value="invoices" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-1 text-[14px] font-medium text-slate-500 data-[state=active]:text-slate-900 transition-none">Invoices & Payments</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-1 text-[14px] font-medium text-slate-500 data-[state=active]:text-slate-900 transition-none">Document Vault</TabsTrigger>
            <TabsTrigger id="kyc-tab-trigger" value="profile" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-1 text-[14px] font-medium text-slate-500 data-[state=active]:text-slate-900 transition-none">Profile</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto p-6 md:p-8 pb-12">
          {/* DASHBOARD TAB */}
          <TabsContent value="dashboard" className="m-0 space-y-6">

            {/* KYC Alert Banner */}
            {user.kycStatus !== "VERIFIED" && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-3">
                  <div className="mt-0.5"><AlertCircle className="w-5 h-5 text-amber-600" /></div>
                  <div>
                    <h4 className="font-semibold text-amber-900 text-sm">
                      {user.kycStatus === "REJECTED" ? "KYC Rejected" : "Complete your KYC"}
                    </h4>
                    <p className="text-sm text-amber-700 mt-0.5">
                      {profile?.kycRejectionReason 
                        ? `Reason: ${profile.kycRejectionReason}. Please resubmit your documents.`
                        : "As per regulations, please submit your PAN and GST details to complete onboarding."}
                    </p>
                  </div>
                </div>
                <Button onClick={() => window.document.getElementById('kyc-tab-trigger')?.click()} variant="outline" className="shrink-0 bg-white border-amber-200 text-amber-700 hover:bg-amber-100">
                  Submit KYC Now
                </Button>
              </div>
            )}

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
                  <div className="text-3xl font-bold text-slate-900">
                    {workRequests.filter(wr => wr.status !== 'COMPLETED').length}
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[13px] text-slate-500 font-medium">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">
                    {workRequests.filter(wr => wr.status === 'COMPLETED').length}
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-slate-200/60 overflow-hidden relative group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[13px] text-slate-500 font-medium">Pending Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">
                    {invoices.filter(inv => inv.status === 'UNPAID').length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MY REQUESTS TAB */}
          <TabsContent value="requests" className="m-0 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-slate-900">Live Status Tracking</h3>
              <Dialog open={isRaiseRequestOpen} onOpenChange={setIsRaiseRequestOpen}>
                <DialogTrigger render={<Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-none" />}>+ Raise New Request</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Raise New Request</DialogTitle>
                    <DialogDescription>Describe the service or request you need.</DialogDescription>
                  </DialogHeader>
                  <form action={async (formData) => {
                    try {
                      setCreatingRequest(true)
                      await createClientWorkRequest(formData)
                      toast.success("Request raised successfully!")
                      setIsRaiseRequestOpen(false)
                    } catch (err) {
                      toast.error("Failed to raise request.")
                    } finally {
                      setCreatingRequest(false)
                    }
                  }}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Request Title / Description</label>
                        <Input name="title" required placeholder="e.g., ITR Filing FY 24-25" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="outline" onClick={() => setIsRaiseRequestOpen(false)}>Cancel</Button>
                      <Button type="submit" disabled={creatingRequest} className="bg-blue-600 hover:bg-blue-700 text-white">
                        {creatingRequest ? "Raising..." : "Submit Request"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-6">
              {workRequests.length === 0 && (
                <div className="p-8 text-center text-slate-500 border border-slate-200/60 rounded-xl bg-slate-50/30">
                  No requests found.
                </div>
              )}
              {workRequests.map((wr) => (
                <Card key={wr.id} className="shadow-sm border-slate-200/60">
                  <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-[15px] font-semibold text-slate-900">{wr.title}</CardTitle>
                        <CardDescription className="mt-1 text-[13px]">Ref: WR-{wr.id.slice(0, 6).toUpperCase()} • Created on {new Date(wr.createdAt).toLocaleDateString()}</CardDescription>
                      </div>
                      <Badge variant="secondary" className={
                        wr.status === 'COMPLETED' ? "bg-emerald-50 text-emerald-700 font-medium border-0 px-2.5" : 
                        wr.status === 'IN_PROGRESS' ? "bg-blue-50 text-blue-700 font-medium border-0 px-2.5" : 
                        "bg-slate-100 text-slate-700 font-medium border-0 px-2.5"
                      }>
                        {wr.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 pb-6 space-y-6">
                    {wr.tasks && wr.tasks.length > 0 && (
                      <div className="space-y-3 border-t border-slate-100 pt-4 mt-2">
                        <h4 className="text-sm font-semibold text-slate-900">Required Documents & Tasks</h4>
                        <div className="space-y-2">
                          {wr.tasks.map((task: any) => (
                            <div key={task.id} className="flex items-center space-x-3 p-3 bg-slate-50/50 rounded-lg border border-slate-100">
                              {task.isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-300" />
                              )}
                              <span className={`text-sm ${task.isCompleted ? "text-slate-400 line-through" : "text-slate-700 font-medium"}`}>
                                {task.description}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                            onClick={() => {
                              setActiveTab("documents")
                              setTimeout(() => documentUploadRef.current?.click(), 100)
                            }}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Documents for Request
                          </Button>
                        </div>
                      </div>
                    )}
                    {(!wr.tasks || wr.tasks.length === 0) && (
                      <p className="text-sm text-slate-500 mt-2">Your CA will review this request and provide a checklist of required documents shortly.</p>
                    )}
                  </CardContent>
                </Card>
              ))}
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
                    {invoices.filter(i => i.status === 'UNPAID' || i.status === 'OVERDUE').length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-slate-500 py-6">No unpaid invoices.</TableCell>
                      </TableRow>
                    )}
                    {invoices.filter(i => i.status === 'UNPAID' || i.status === 'OVERDUE').map(inv => (
                      <TableRow key={inv.id} className="hover:bg-slate-50/40">
                        <TableCell className="font-medium text-blue-600 text-[14px]">INV-{inv.id.slice(0, 8).toUpperCase()}</TableCell>
                        <TableCell className="text-[14px] text-slate-700">{inv.workRequest?.title || "Professional Services"}</TableCell>
                        <TableCell className="font-semibold text-slate-900 text-[14px]">₹{inv.amount.toLocaleString('en-IN')}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={inv.status === 'OVERDUE' ? "bg-red-50 text-red-600 hover:bg-red-50 font-medium border-0 px-2" : "bg-amber-50 text-amber-700 font-medium border-0 px-2"}>
                            {inv.status}
                          </Badge>
                        </TableCell>
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
                                </div>
                              </div>
                                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                                  <Button 
                                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-[14px] font-medium shadow-sm" 
                                    disabled={submittingPayment === inv.id || !utrNumber}
                                    onClick={async () => {
                                      try {
                                        setSubmittingPayment(inv.id)
                                        await submitClientPayment(inv.id, inv.amount, utrNumber)
                                        toast.success("Payment details submitted successfully!")
                                        setUtrNumber("")
                                        router.refresh()
                                      } catch(err) {
                                        toast.error("Failed to submit payment details")
                                      } finally {
                                        setSubmittingPayment(null)
                                      }
                                    }}
                                  >
                                    {submittingPayment === inv.id ? "Submitting..." : "Submit Payment Details"}
                                  </Button>
                                </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
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
                    {invoices.flatMap(i => i.payments).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-slate-500 py-6">No payments recorded.</TableCell>
                      </TableRow>
                    )}
                    {invoices.flatMap(i => i.payments).map((payment: any) => (
                      <TableRow key={payment.id} className="hover:bg-slate-50/40">
                        <TableCell className="text-[14px] text-slate-700">{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium text-slate-900 text-[14px]">₹{payment.amount.toLocaleString('en-IN')}</TableCell>
                        <TableCell className="font-mono text-[13px] text-slate-500">{payment.utrNumber || "-"}</TableCell>
                        <TableCell><Badge variant="secondary" className="bg-emerald-50 text-emerald-700 font-medium border-0 px-2">{payment.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DOCUMENT VAULT TAB */}
          <TabsContent value="documents" className="m-0 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-slate-900">Secure Document Vault</h3>
              <input
                type="file"
                ref={documentUploadRef}
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("File size must be less than 5MB")
                    return
                  }
                  
                  const formData = new FormData()
                  formData.append("file", file)
                  
                  try {
                    setUploadingDoc(true)
                    toast.loading("Uploading document...", { id: "upload" })
                    await uploadClientDocument(formData)
                    toast.success("Document uploaded securely", { id: "upload" })
                    router.refresh()
                  } catch (err) {
                    toast.error("Failed to upload document", { id: "upload" })
                  } finally {
                    setUploadingDoc(false)
                    if (documentUploadRef.current) documentUploadRef.current.value = ""
                  }
                }}
              />
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-none" 
                disabled={uploadingDoc}
                onClick={() => documentUploadRef.current?.click()}
              >
                {uploadingDoc ? <Loader2 className="h-4 w-4 mr-2 animate-spin"/> : <Upload className="h-4 w-4 mr-2"/>} 
                {uploadingDoc ? "Uploading..." : "Upload Document"}
              </Button>
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
                    {(!documents || documents.length === 0) ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                          No documents in your secure vault yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      documents.map((doc: any) => {
                      const isLocked = doc.title.startsWith("[FINAL]") && (!doc.workRequestId || invoices.some((inv: any) => inv.workRequestId === doc.workRequestId && inv.status !== "PAID") || !invoices.some((inv: any) => inv.workRequestId === doc.workRequestId))
                      return (
                        <TableRow key={doc.id} className="hover:bg-slate-50/40">
                          <TableCell className="font-medium text-slate-900 flex items-center gap-2">
                            <FileText className={`h-4 w-4 ${isLocked ? "text-amber-500" : "text-blue-500"}`}/> {doc.title}
                          </TableCell>
                          <TableCell className="text-[14px] text-slate-600">
                            {doc.uploadedById === user.id ? "You" : doc.uploadedBy?.name || "Staff"}
                          </TableCell>
                          <TableCell className="text-[14px] text-slate-500">
                            {new Date(doc.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              disabled={isLocked}
                              className="h-8 text-xs font-medium border-slate-200 hover:bg-slate-50 text-slate-700" 
                              onClick={() => {
                                window.open(`/api/documents/${doc.id}`, "_blank")
                              }}
                            >
                              {isLocked ? "Pay to Unlock" : "Download"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                    )}
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
                    <div className="relative group">
                      <div className="h-16 w-16 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-center text-blue-600 text-xl font-bold tracking-tight overflow-hidden transition-all relative">
                        {avatar ? (
                          <Image src={avatar} alt="Avatar" fill className="object-cover" />
                        ) : (
                          (profile?.companyName || user.name).substring(0, 3).toUpperCase()
                        )}
                        
                        <div 
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {loadingAvatar ? <Loader2 className="h-5 w-5 text-white animate-spin" /> : <Camera className="h-5 w-5 text-white" />}
                        </div>
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <CardTitle className="text-xl">{profile?.companyName || user.name}</CardTitle>
                      <CardDescription className="text-[14px]">
                        {user.email} &bull; <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => fileInputRef.current?.click()}>Update Logo</span>
                      </CardDescription>
                    </div>
                  </div>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 p-8">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-slate-500 uppercase tracking-wider">Company PAN</label>
                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 font-mono text-[14px] text-slate-900">{profile?.decryptedPan || "Not Provided"}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-slate-500 uppercase tracking-wider">GSTIN</label>
                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 font-mono text-[14px] text-slate-900">{profile?.decryptedGst || "Not Provided"}</div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[13px] font-medium text-slate-500 uppercase tracking-wider">Registered Address</label>
                  <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 text-[14px] text-slate-900 leading-relaxed">{profile?.address || "Not Provided"}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  )
}





