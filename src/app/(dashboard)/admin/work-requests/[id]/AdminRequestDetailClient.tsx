"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Save, IndianRupee, Loader2, Download, UserPlus, FileCheck } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { updateWorkRequestStatus, updateWorkRequestFee, assignStaffToRequest, generateInvoiceForRequest } from "@/app/actions/work-requests"

export default function AdminRequestDetailClient({ workRequest, staffMembers }: { workRequest: any, staffMembers: any[] }) {
  const router = useRouter()
  const [status, setStatus] = useState(workRequest.status)
  const [fee, setFee] = useState(workRequest.feeAmount?.toString() || "")
  const [assignedStaff, setAssignedStaff] = useState(workRequest.assignedStaffId || "unassigned")
  const [savingStatus, setSavingStatus] = useState(false)
  const [generatingInvoice, setGeneratingInvoice] = useState(false)

  const handleSaveSettings = async () => {
    try {
      setSavingStatus(true)
      await updateWorkRequestStatus(workRequest.id, status)
      
      const parsedFee = parseFloat(fee)
      if (!isNaN(parsedFee) && parsedFee !== workRequest.feeAmount) {
        await updateWorkRequestFee(workRequest.id, parsedFee)
      }

      if (assignedStaff !== workRequest.assignedStaffId) {
        await assignStaffToRequest(workRequest.id, assignedStaff === "unassigned" ? null : assignedStaff)
      }

      toast.success("Admin settings saved successfully!")
      window.location.reload()
    } catch (err) {
      toast.error("Failed to update settings")
    } finally {
      setSavingStatus(false)
    }
  }

  const handleGenerateInvoice = async () => {
    if (!fee || isNaN(parseFloat(fee))) {
      toast.error("Please set a valid fee amount first.")
      return
    }
    try {
      setGeneratingInvoice(true)
      await generateInvoiceForRequest(workRequest.id, parseFloat(fee))
      toast.success("Invoice generated! Client can now pay.")
      window.location.reload()
    } catch (err: any) {
      toast.error(err.message || "Failed to generate invoice")
    } finally {
      setGeneratingInvoice(false)
    }
  }

  const isCompleted = status === "COMPLETED"

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{workRequest.title}</h2>
          <p className="text-slate-500">Client: {workRequest.client.user.name} ({workRequest.client.companyName})</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.push("/admin/work-requests")}>Back to Requests</Button>
          <Button onClick={handleSaveSettings} disabled={savingStatus} className="bg-blue-600 hover:bg-blue-700 text-white">
            {savingStatus ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Staff Execution Progress</CardTitle>
                <CardDescription>Monitor the checklist being filled by the assigned staff.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                {workRequest.tasks.length === 0 && <p className="text-sm text-slate-500">No checklist items defined by staff yet.</p>}
                {workRequest.tasks.map((task: any) => (
                  <div key={task.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100 opacity-80 pointer-events-none">
                    <Checkbox checked={task.isCompleted} />
                    <label className={`text-sm font-medium leading-none ${task.isCompleted ? "line-through text-slate-400" : "text-slate-700"}`}>
                      {task.description}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Documents & Final Deliverables</CardTitle>
              <CardDescription>Files uploaded by Client or Staff. Name files "[FINAL] anything" to lock them until invoice is paid.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workRequest.documents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6 text-slate-500">No documents uploaded for this request.</TableCell>
                    </TableRow>
                  )}
                  {workRequest.documents.map((doc: any) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        {doc.title.startsWith("[FINAL]") ? <FileCheck className="w-4 h-4 text-emerald-500"/> : <FileText className="w-4 h-4 text-blue-500"/>} 
                        {doc.title}
                      </TableCell>
                      <TableCell className="text-slate-500 text-sm">{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => window.open(`/api/documents/${doc.id}`, "_blank")}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Admin Controls</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><UserPlus className="w-4 h-4"/> Assign Staff</label>
                <Select value={assignedStaff} onValueChange={setAssignedStaff}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned" className="text-slate-400 font-medium">Unassigned</SelectItem>
                    {staffMembers.map(staff => (
                      <SelectItem key={staff.id} value={staff.id}>{staff.name || "Unnamed Staff"}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Workflow Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="AWAITING_CLIENT">Awaiting Client</SelectItem>
                    <SelectItem value="FOR_REVIEW">For Review (Staff Done)</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><IndianRupee className="w-4 h-4"/> Final Quoted Fee</label>
                <Input 
                  type="number" 
                  placeholder="e.g. 5000" 
                  value={fee} 
                  onChange={(e) => setFee(e.target.value)} 
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Button 
                  onClick={handleGenerateInvoice} 
                  disabled={generatingInvoice || workRequest.invoices.length > 0} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {workRequest.invoices.length > 0 ? "Invoice Already Sent" : "Generate Payment Link"}
                </Button>
                {workRequest.invoices.length > 0 && (
                  <p className="text-[12px] text-center text-slate-500 mt-2">
                    Invoice status: <span className="font-bold">{workRequest.invoices[0].status}</span>
                  </p>
                )}
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

