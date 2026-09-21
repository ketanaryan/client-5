"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Plus, Save, Clock, MessageSquare, Loader2, Download } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { updateWorkRequestStatus, addTaskToRequest, toggleTaskStatus } from "@/app/actions/work-requests"

export default function RequestDetailClient({ workRequest, currentUser }: { workRequest: any, currentUser: any }) {
  const router = useRouter()
  const [status, setStatus] = useState(workRequest.status)
  const [newTask, setNewTask] = useState("")
  const [savingStatus, setSavingStatus] = useState(false)
  const [savingTask, setSavingTask] = useState(false)

  const [dummyTasks, setDummyTasks] = useState([
    { id: "dummy-1", description: "Please upload your sign", isCompleted: true },
    { id: "dummy-2", description: "Upload your photo", isCompleted: true },
    { id: "dummy-3", description: "Upload your income proof", isCompleted: false },
  ])

  const handleToggleDummyTask = (taskId: string) => {
    setDummyTasks(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t))
  }

  const handleSaveStatus = async () => {
    try {
      setSavingStatus(true)
      await updateWorkRequestStatus(workRequest.id, status)
      toast.success("Request updated successfully!")
      router.refresh()
    } catch (err) {
      toast.error("Failed to update request")
    } finally {
      setSavingStatus(false)
    }
  }

  const handleAddTask = async () => {
    if (!newTask.trim()) return
    try {
      setSavingTask(true)
      await addTaskToRequest(workRequest.id, newTask)
      setNewTask("")
      toast.success("Task added to checklist!")
      router.refresh()
    } catch (err) {
      toast.error("Failed to add task")
    } finally {
      setSavingTask(false)
    }
  }

  const handleToggleTask = async (taskId: string, currentStatus: boolean) => {
    try {
      await toggleTaskStatus(taskId, !currentStatus)
      router.refresh()
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{workRequest.title}</h2>
          <p className="text-slate-500">Client: {workRequest.client.user.name} ({workRequest.client.companyName})</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.push("/staff/requests")}>Back to Requests</Button>
          <Button onClick={handleSaveStatus} disabled={savingStatus} className="bg-blue-600 hover:bg-blue-700 text-white">
            {savingStatus ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Requirement Checklist (Tasks)</CardTitle>
              <CardDescription>Tell the client exactly what documents or steps are required.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="e.g. Please upload Form 16" 
                  value={newTask} 
                  onChange={(e) => setNewTask(e.target.value)} 
                  onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                />
                <Button onClick={handleAddTask} disabled={savingTask} variant="secondary">
                  <Plus className="w-4 h-4 mr-2" /> Add Task
                </Button>
              </div>
              <div className="space-y-3 mt-4">
                {workRequest.tasks.map((task: any) => (
                  <div key={task.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <Checkbox 
                      checked={task.isCompleted} 
                      onCheckedChange={() => handleToggleTask(task.id, task.isCompleted)} 
                    />
                    <label className={`text-sm font-medium leading-none ${task.isCompleted ? "line-through text-slate-400" : "text-slate-700"}`}>
                      {task.description}
                    </label>
                  </div>
                ))}
                
                {dummyTasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <Checkbox 
                      checked={task.isCompleted} 
                      onCheckedChange={() => handleToggleDummyTask(task.id)} 
                    />
                    <label className={`text-sm font-medium leading-none ${task.isCompleted ? "line-through text-slate-400" : "text-slate-700"}`}>
                      {task.description} <span className="text-xs text-blue-500 ml-2 font-normal">(Dummy)</span>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Client Documents</CardTitle>
              <CardDescription>Documents uploaded securely for this request.</CardDescription>
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
                        <FileText className="w-4 h-4 text-blue-500"/> {doc.title}
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
              <CardTitle className="text-lg">Request Settings</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <span>
                      {status === "PENDING" ? "Pending" : 
                       status === "IN_PROGRESS" ? "In Progress" : 
                       status === "AWAITING_CLIENT" ? "Awaiting Client" : 
                       status === "FOR_REVIEW" ? "For Review" : 
                       status === "COMPLETED" ? "Completed" : status}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="AWAITING_CLIENT">Awaiting Client</SelectItem>
                    <SelectItem value="FOR_REVIEW">For Review</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
