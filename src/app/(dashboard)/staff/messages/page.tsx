import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Server component
export default async function StaffMessagesPage() {
  const session = await auth()

  if (!session?.user?.role || !["STAFF", "ADMIN"].includes(session.user.role)) {
    redirect("/")
  }

  const userId = session.user.id!

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId },
      ],
    },
    include: {
      sender: { select: { id: true, name: true, email: true } },
      receiver: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex flex-col h-full bg-[#f8fafd]">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-slate-200">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Messages</h1>
          <p className="text-sm text-slate-500 mt-1">Communication with clients and team.</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-slate-50 border-b border-slate-200">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase pl-6 py-4">Date</TableHead>
                <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase py-4">From</TableHead>
                <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase py-4">To</TableHead>
                <TableHead className="text-slate-500 font-semibold text-xs tracking-wider uppercase py-4 w-[40%]">Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                    No messages yet.
                  </TableCell>
                </TableRow>
              ) : (
                messages.map((msg) => (
                  <TableRow key={msg.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <TableCell className="pl-6 py-4">
                      <span className="text-slate-600 text-sm whitespace-nowrap">
                        {new Date(msg.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-slate-800">{msg.sender.name || "Unknown"}</span>
                        <span className="text-xs text-slate-500">{msg.sender.email}</span>
                      </div>
                      {msg.senderId === userId && (
                        <Badge className="mt-1 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-2 py-0.5 text-[10px]">You</Badge>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-slate-800">{msg.receiver.name || "Unknown"}</span>
                        <span className="text-xs text-slate-500">{msg.receiver.email}</span>
                      </div>
                      {msg.receiverId === userId && (
                        <Badge className="mt-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-2 py-0.5 text-[10px]">You</Badge>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                        {msg.content}
                      </p>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
