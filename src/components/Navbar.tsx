"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Mail, Menu, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-2xl tracking-tight hover:text-emerald-200 transition-colors duration-200 flex items-center group">
          <div className="relative w-8 h-8 mr-2 overflow-hidden rounded-full">
            <Image
              src="/images/sync.png"
              alt="IrrigaSync Icon"
              layout="fill"
              objectFit="cover"
              className="transition-all duration-300 group-hover:invert"
            />
          </div>
          <span className="transition-all duration-300 group-hover:invert">IrrigaSync</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <NavItem href="/" label="Home" icon={<Home className="mr-2 h-4 w-4" />} />
          <a href="mailto:deivisonbambui@gmail.com">
            <Button variant="link" size="sm" className="text-white hover:text-emerald-200 hover:bg-emerald-700/20">
              <Mail className="mr-2 h-4 w-4" />
              Contato
            </Button>
          </a>          
          <a href="https://github.com/Deivison-Costa" target="_blank" rel="noopener noreferrer">
            <Button variant="link" size="sm" className="text-white hover:text-emerald-200 hover:bg-emerald-700/20">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </a>
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:text-emerald-200 hover:bg-emerald-700/20">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-emerald-500">
              <DropdownMenuItem>
                <Link href="/" className="flex w-full items-center">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="mailto:deivisonbambui@gmail.com" className="flex w-full items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Contato
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="https://github.com/Deivison-Costa" className="flex w-full items-center">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

function NavItem({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700/20 transition-colors duration-200 flex items-center"
    >
      {icon}
      {label}
    </Link>
  )
}