"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation" // Import usePathname
import { BarChart3, Package, ClipboardList, CircleDollarSign, Shapes, Gauge, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface NavItemProps {
  icon: React.ElementType
  title: string
  isActive?: boolean
  href: string
  isCollapsed: boolean
}

function NavItem({ icon: Icon, title, isActive, href, isCollapsed }: NavItemProps) {
  const activeClasses = "bg-blue-100 text-blue-700"
  const inactiveClasses = "text-slate-500 hover:bg-slate-100 hover:text-slate-700"

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center py-3 transition-colors duration-150 rounded-md mx-2",
        isActive ? activeClasses : inactiveClasses,
        isCollapsed ? "h-16" : "h-20",
      )}
      title={isCollapsed ? title : undefined}
    >
      <Icon className={cn("h-7 w-7 mb-1", isActive ? "text-blue-600" : "text-slate-500")} />
      {!isCollapsed && <span className="text-xs text-center">{title}</span>}
    </Link>
  )
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname() // Get current pathname

  const navItems = [
    { href: "/dashboard", title: "Dashboard", icon: BarChart3 },
    { href: "/products", title: "Products", icon: Package },
    { href: "/orders", title: "Orders", icon: ClipboardList },
    { href: "/balance", title: "Balance", icon: CircleDollarSign },
    { href: "/seller-pulse", title: "Seller Pulse", icon: Gauge },
    { href: "/help", title: "Help Center", icon: HelpCircle }, // New item
  ]

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-white transition-all duration-200 ease-in-out",
        collapsed ? "w-[80px]" : "w-[120px]",
      )}
    >
      <div className="flex items-center h-16 border-b px-2 shrink-0 justify-center">
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-2 h-12 w-full text-slate-600 hover:bg-slate-100 hover:text-slate-800 focus-visible:ring-0 focus-visible:ring-offset-0"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Shapes className={cn("h-6 w-6", collapsed ? "text-blue-600" : "text-blue-600")} />
          {!collapsed && <span className="text-lg font-bold tracking-tight text-blue-600">ssello</span>}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto py-2 space-y-1.5">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            title={item.title}
            icon={item.icon}
            // Update isActive to check if the current pathname starts with the item's href
            // This handles cases like /products/new still highlighting /products
            isActive={pathname.startsWith(item.href)}
            isCollapsed={collapsed}
          />
        ))}
      </nav>
      {collapsed && (
        <div className="mt-auto flex items-center justify-center h-14 border-t">
          <Shapes className="h-6 w-6 text-blue-600" />
        </div>
      )}
    </div>
  )
}
