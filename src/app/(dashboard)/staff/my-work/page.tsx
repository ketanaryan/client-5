"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare, CheckCircle, FileText, Send } from "lucide-react"

type Task = { id: string; title: string; completed: boolean }
type Note = { id: string; text: string; time: string; author: string }

const INITIAL_WORK = [
  {
    id: "WR-1024",
    client: "ABC Pvt Ltd",
    title: "GST Return - Aug 2026",
    status: "In Progress",
    dueDate: "05 Sep 2026",
    tasks: [
      { id: "t1", title: "Collect purchase invoices", completed: true },
      { id: "t2", title: "Reconcile GSTR-2B", completed: false },
      { id: "t3", title: "Draft GSTR-3B", completed: false },
      { id: "t4", title: "Client Approval", completed: false }
    ],
    notes: [
      { id: "n1", text: "Waiting on client to upload August bank statements.", time: "2 hrs ago", author: "Rahul" }
    ]
  },
  {
    id: "WR-1025",
    client: "Global Tech",
    title: "Audit Prep FY 25-26",
    status: "Awaiting Client",
    dueDate: "10 Sep 2026",
    tasks: [
      { id: "t5", title: "Request Trial Balance", completed: true },
      { id: "t6", title: "Vouching fixed assets", completed: true },
      { id: "t7", title: "Verify bank reconciliation", completed: false }
    ],
    notes: []
  }
]

export default function MyWorkPage() {
  const [workItems, setWorkItems] = useState(INITIAL_WORK)
  const [newNote, setNewNote] = useState("")

  const toggleTask = (workId: string, taskId: string) => {
    setWorkItems(prev => prev.map(work => {
      if (work.id === workId) {
        return {
          ...work,
          tasks: work.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
        }
      }
      return work
    }))
  }

  const addNote = (workId: string) => {
    if (!newNote.trim()) return
    setWorkItems(prev => prev.map(work => {
      if (work.id === workId) {
        return {
          ...work,
          notes: [...work.notes, { id: Date.now().toString(), text: newNote, time: "Just now", author: "You" }]
        }
      }
      return work
    }))
    setNewNote("")
  }

  const markComplete = (workId: string) => {
    setWorkItems(prev => prev.map(work => {
      if (work.id === workId) {
        return { ...work, status: "Completed", tasks: work.tasks.map(t => ({ ...t, completed: true })) }
      }
      return work
    }))
    alert(`Admin notified! ${workId} has been marked complete.`)
  }

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden bg-[#f8fafc] p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">My Active Work</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your checklists, notes, and progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {workItems.map((work) => {
          const progress = Math.round((work.tasks.filter(t => t.completed).length / work.tasks.length) * 100)
          
          return (
            <Card key={work.id} className="flex flex-col border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-white">{work.id}</Badge>
                  <Badge className={
                    work.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                    work.status === "In Progress" ? "bg-blue-50 text-blue-600" :
                    "bg-orange-50 text-orange-600"
                  }>{work.status}</Badge>
                </div>
                <CardTitle className="text-lg">{work.title}</CardTitle>
                <p className="text-sm font-medium text-slate-600">{work.client}</p>
              </CardHeader>
              
              <CardContent className="flex-1 pt-4 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-500 mb-1.5">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Checklist
                  </h4>
                  <div className="space-y-2">
                    {work.tasks.map(task => (
                      <div key={task.id} className="flex items-start space-x-2">
                        <Checkbox 
                          id={task.id} 
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(work.id, task.id)}
                          className="mt-0.5"
                        />
                        <label htmlFor={task.id} className={`text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                          {task.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-slate-100 p-4 bg-slate-50/50 flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-200">
                      <MessageSquare className="h-4 w-4 mr-2" /> Notes ({work.notes.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Internal Notes: {work.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 my-4 max-h-[300px] overflow-y-auto pr-2">
                      {work.notes.length === 0 && <p className="text-sm text-slate-500 italic">No notes yet.</p>}
                      {work.notes.map(note => (
                        <div key={note.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <p className="text-sm text-slate-700">{note.text}</p>
                          <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                            <span>{note.author}</span>
                            <span>{note.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Textarea 
                        placeholder="Add a note..." 
                        value={newNote}
                        onChange={e => setNewNote(e.target.value)}
                        className="resize-none"
                      />
                      <Button onClick={() => addNote(work.id)} size="icon" className="shrink-0 bg-blue-600">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => markComplete(work.id)}
                  disabled={progress < 100 || work.status === "Completed"}
                >
                  <CheckCircle className="h-4 w-4 mr-2" /> Complete
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
