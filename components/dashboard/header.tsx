"use client"

import { useState } from "react"
import { Bell, HelpCircle, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function DashboardHeader() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 md:px-8">
      <div className="hidden md:block flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products, orders..."
            className="w-full max-w-sm pl-8 bg-background"
          />
        </div>
      </div>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowSearch(!showSearch)}>
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
      <div
        className={`absolute top-16 left-0 right-0 p-4 bg-background border-b md:hidden ${showSearch ? "block" : "hidden"}`}
      >
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search products, orders..." className="w-full pl-8 bg-background" />
        </div>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Link href="/help" passHref>
          <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label="Help">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>
        </Link>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Language</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
