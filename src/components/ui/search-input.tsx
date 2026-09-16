"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition, useState, useEffect } from "react"

export function SearchInput({ placeholder = "Search..." }: { placeholder?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(searchParams?.get("q") || "")

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString() || "")
      if (value) {
        params.set("q", value)
      } else {
        params.delete("q")
      }
      startTransition(() => {
        router.replace(`?${params.toString()}`)
      })
    }, 300)
    
    return () => clearTimeout(timer)
  }, [value, router, searchParams])

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-slate-300"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {isPending && <div className="absolute right-3 top-3 h-3 w-3 rounded-full border-2 border-slate-300 border-t-slate-600 animate-spin" />}
    </div>
  )
}
