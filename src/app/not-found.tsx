import Link from 'next/link'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-8xl font-extrabold text-[#032b4e] tracking-tight">404</h1>
        <h2 className="text-3xl font-bold text-slate-800 mt-6">Page Not Found</h2>
        <p className="text-slate-500 mt-4 max-w-md text-lg">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link href="/" className="mt-8">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
            Return Home
          </Button>
        </Link>
      </div>
      <Footer />
    </main>
  )
}
