"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Search from "./search"
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"

const navigations = [
    ['/','Home'],
    ['/movies','Movies'],
    ['/tv','TV'],
    ['/about','About'],
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-20">
          
          {/* Logo */}
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ndeleng
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-3">
                {navigations.map((item) => (
                  <NavigationMenuItem key={item[0]}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item[0]}
                        className="px-3 py-2 transition-colors font-[600] text-gray-300 hover:text-white hover:bg-purple-600 focus:bg-purple-600 focus:text-white"
                      >
                        {item[1]}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

          {/* Search */}
            <div className="flex items-center gap-2">
              <Search/>
            </div>
          </div>


          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <HiOutlineX size={24}/> : <HiOutlineMenu size={24}/>}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-white/5 flex justify-end px-4 py-2">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col items-end">
              <Search/>
                {navigations.map((item) => (
                  <NavigationMenuItem key={item[0]}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item[0]}
                        className="block px-3 py-2 font-[600] text-gray-300 hover:text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        {item[1]}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </div>
  )
}
