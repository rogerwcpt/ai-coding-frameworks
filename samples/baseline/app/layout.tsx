import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "North Wharf Ferries",
  description: "Today's sailings at North Wharf.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-[#d9d1c3]">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
            <p className="font-semibold">North Wharf Ferries</p>
            <nav className="flex gap-4 text-sm">
              <Link href="/">Today</Link>
              <Link href="/staff">Staff</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
