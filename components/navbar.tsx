"use client"

import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#service-area", label: "Service Area" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background backdrop-blur supports-[backdrop-filter]:bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image src="/logo.png" alt="All Dat Junk Logo" width={120} height={50} className="h-12 w-auto" />
          <span className="text-xl font-bold tracking-tight text-foreground">All Dat Junk</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Phone CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <a href="tel:2792829386">
              <Phone className="mr-2 h-4 w-4" />
              Call Now: (279) 282-9386
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col space-y-4 px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href="tel:2792829386">
                <Phone className="mr-2 h-4 w-4" />
                Call Now: (279) 282-9386
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
