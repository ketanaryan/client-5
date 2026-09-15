"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("password123")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await signIn("credentials", { email, password, redirect: false })
    setLoading(false)
    if (res?.ok) {
      if (email.includes("admin")) router.push("/admin")
      else if (email.includes("client")) router.push("/client")
      else if (email.includes("associate")) router.push("/associate")
      else router.push("/staff")
    } else {
      alert("Invalid credentials")
    }
  }

  const demoLogins = [
    { role: "Admin", email: "admin@ca.com" },
    { role: "Staff", email: "rahul@ca.com" },
    { role: "Client", email: "client@ca.com" },
    { role: "Associate", email: "associate@ca.com" },
  ]

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your email below to login to the portal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Demo Accounts</span></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {demoLogins.map((demo) => (
              <Button key={demo.role} variant="outline" onClick={() => setEmail(demo.email)}>
                {demo.role}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
