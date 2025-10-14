import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layouts/navbar";
import Design from "../components/layouts/design";
import SessionWrapper from "@/lib/session/session-wrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ndeleng",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <SessionWrapper session={session}>
        <Navbar/>
        <div className="relative h-screen overflow-y-auto scroll-hidden overflow-x-hidden bg-[#040302]"> 
        {/* <Design/> */}
        <div className="pt-15">
          {children}
        </div>
        </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
