import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stack Assignment - Expert Academic Writing Help",
  description: "Professional academic writing & assignment assistance since 2010. PhD-qualified writers, 100% original content, on-time delivery. Expert help for essays, dissertations, research papers, and more.",
  keywords: ["academic writing", "assignment help", "essay writing", "dissertation help", "research paper", "thesis writing", "homework help", "university assignment", "Stack Assignment"],
  authors: [{ name: "Stack Assignment" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Stack Assignment - Expert Academic Writing Help",
    description: "Professional academic writing & assignment assistance since 2010. PhD-qualified writers, 100% original content.",
    url: "https://stackassignment.com",
    siteName: "Stack Assignment",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stack Assignment - Expert Academic Writing Help",
    description: "Professional academic writing & assignment assistance since 2010.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
