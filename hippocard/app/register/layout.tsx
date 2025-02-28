import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@/styles/animations.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HippoCard",
  description: "Healthcare Management System",
  keywords: "",
  authors: [{ name: "" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}