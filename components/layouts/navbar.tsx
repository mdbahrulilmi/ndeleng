"use client"

import * as React from "react"
import Link from "next/link"
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import Search from "./search"
import { SessionProvider, useSession } from "next-auth/react"
import LoginButton from "@/app/login/button"
import { usePathname } from "next/navigation"

const navigations = [
  ["/", "Home"],
  ["/movies", "Movies"],
  ["/tv", "TV"],
  ["/foryou", "For you"],
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-background">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-20">
          
          {/* Logo */}
          <h1 className="text-2xl font-bold bg-primary bg-clip-text text-transparent">
            <span className="text-white">n</span>deleng
          </h1>

          {/* Desktop Search */}
          <div className="hidden md:block">
            <Search />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
           {navigations.map(([href, label]) => {
            if (label === "For you" && !session) return null;

            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-2 py-1 text-gray-300 font-semibold transition-all duration-300 
                  ${isActive ? "text-primary" : "hover:text-primary"}
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] 
                  after:w-full after:scale-x-0 after:bg-primary after:origin-right after:transition-transform 
                  hover:after:origin-left hover:after:scale-x-100
                  ${isActive ? "after:scale-x-100 after:origin-left" : ""}`}
              >
                {label}
              </Link>
            );
          })}
              <LoginButton />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3 px-4">
          <Search />
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center w-full pb-4 space-y-2 bg-[#040302]">
            {navigations.map(([href, label]) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`w-full text-center text-lg py-2 font-semibold text-gray-300 
                    transition-all duration-300 border-b-2 
                    ${isActive ? "text-primary border-primary" : "border-transparent hover:border-primary hover:text-primary"}`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              )
            })}
            <SessionProvider>
              <LoginButton />
            </SessionProvider>
          </div>
        )}
      </div>
    </div>
  )
}
