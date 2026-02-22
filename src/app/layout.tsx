import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PayMail - Invoice Inbox",
  description: "A Gmail-like interface for managing and paying invoices.",
  openGraph: {
    title: "PayMail - Invoice Inbox",
    description: "A Gmail-like interface for managing and paying invoices.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@replit",
    title: "PayMail - Invoice Inbox",
    description: "A Gmail-like interface for managing and paying invoices.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
