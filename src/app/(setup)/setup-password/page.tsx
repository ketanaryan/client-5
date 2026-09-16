import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import SetupPasswordForm from "./SetupPasswordForm"

export default async function SetupPasswordPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/login")
  }
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })
  
  if (!user?.isFirstLogin) {
    redirect(`/${user?.role.toLowerCase()}`)
  }

  return <SetupPasswordForm />
}
