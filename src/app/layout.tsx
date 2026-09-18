import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
  themeColor: '#032b4e',
}

export const metadata: Metadata = {
  title: {
    default: "CA Shantanu & Associates | Chartered Accountants in Bangalore",
    template: "%s | CA Shantanu & Associates",
  },
  description: "Premium Chartered Accountancy firm in Bangalore providing expert Tax Advisory, Compliance, Audit, and Business Formation services.",
  keywords: ["CA in Bangalore", "Chartered Accountant", "Tax Consultant", "GST Registration", "Company Formation", "ITR Filing"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ca-erp-demo.com",
    title: "CA Shantanu & Associates",
    description: "Premium Chartered Accountancy firm in Bangalore providing expert Tax Advisory, Compliance, Audit, and Business Formation services.",
    siteName: "CA Shantanu & Associates",
  },
};

import { DisclaimerModal } from "@/components/public/DisclaimerModal";
import { CookieBanner } from "@/components/public/CookieBanner";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
        <DisclaimerModal />
        <CookieBanner />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

