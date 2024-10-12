"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Mail, Menu } from "lucide-react"

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
        <Link href="/" className="text-white font-bold text-2xl tracking-tight hover:text-emerald-200 transition-colors duration-200">
          IrrigaSync
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <NavItem href="/" label="Home" />
          <NavItem href="/about" label="Sobre" />
          <NavItem href="/services" label="Serviços" />
          <Button variant="ghost" size="sm" className="text-white hover:text-emerald-200 hover:bg-emerald-700/20">
            <Mail className="mr-2 h-4 w-4" />
            Contato
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:text-emerald-200 hover:bg-emerald-700/20">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
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
                <Link href="/" className="flex w-full items-center">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/about" className="flex w-full items-center">Sobre</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/services" className="flex w-full items-center">Serviços</Link>
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

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-white hover:text-emerald-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700/20 transition-colors duration-200"
    >
      {label}
    </Link>
  )
}