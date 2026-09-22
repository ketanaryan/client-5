"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2 } from "lucide-react"

export function EntitySwitcher({ profiles, currentEntityId }: { profiles: any[], currentEntityId: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSwitch = (entityId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("entityId", entityId)
    router.push(`${pathname}?${params.toString()}`)
  }

  if (!profiles || profiles.length <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-medium text-slate-500 whitespace-nowrap">Viewing Entity:</div>
      <Select value={currentEntityId} onValueChange={handleSwitch}>
        <SelectTrigger className="w-[250px] bg-white border-slate-200">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-600" />
            <SelectValue placeholder="Select Entity" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {profiles.map(p => (
            <SelectItem key={p.id} value={p.id}>
              {p.companyName || p.user?.name || "Unnamed Entity"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
