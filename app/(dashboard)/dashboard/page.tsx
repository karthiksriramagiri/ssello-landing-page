"use client"

import type React from "react"
import { useState } from "react"
// UI Components (shadcn/ui)
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SellerPulse } from "@/components/dashboard/seller-pulse"

// Icons (lucide-react)
import {
  Rocket,
  CircleDashed,
  AlertCircleIcon,
  X,
  Clock,
  PackageIcon,
  PackageCheck,
  Calendar,
  ChevronDown,
  TrendingUp,
  ShoppingCart,
  PlusCircle,
  BarChart3,
  ClipboardList,
  CircleDollarSign,
  HelpCircle,
} from "lucide-react"

// Charting Library
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts" // Updated for BarChart

// Utilities
import { cn } from "@/lib/utils"
import Link from "next/link"

/* ==========================================================================
OnboardingProgress Component
========================================================================== */
function OnboardingProgress() {
  const steps = [
    { title: "Account Created", isCompleted: true },
    { title: "Products Uploaded", isCompleted: true },
    { title: "Link Bank Account", isCompleted: false },
    { title: "Upload Documents", isCompleted: false },
  ]

  const completedSteps = steps.filter((step) => step.isCompleted).length
  const progressValue = (completedSteps / steps.length) * 100
  const allStepsCompleted = completedSteps === steps.length

  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm flex flex-col sm:flex-row items-center gap-3">
      <div className="flex items-center gap-2 flex-shrink-0">
        {allStepsCompleted ? (
          <Rocket className="h-5 w-5 text-green-500" />
        ) : (
          <CircleDashed className="h-5 w-5 text-muted-foreground" />
        )}
        <h2 className="text-sm font-medium text-foreground whitespace-nowrap">
          {allStepsCompleted ? "Onboarding Complete!" : "Complete Onboarding"}
        </h2>
      </div>
      <div className="flex-grow w-full sm:w-auto">
        <Progress value={progressValue} className="h-2 bg-orange-100" indicatorClassName="bg-primary" />
      </div>
      <div className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
        {completedSteps}/{steps.length} Steps Done
      </div>
      {!allStepsCompleted && (
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-7 px-3 whitespace-nowrap flex-shrink-0"
        >
          Finish Setup
        </Button>
      )}
    </div>
  )
}

/* ==========================================================================
Notification Component
========================================================================== */
interface NotificationProps {
  title: string
  message: string
  isNew?: boolean
}

function Notification({ title, message, isNew = false }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <Alert className="relative bg-secondary border-orange-200 border-l-4 border-l-primary p-3 rounded-lg">
      {isNew && (
        <div className="absolute -top-1.5 -left-1.5 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-medium shadow">
          NEW
        </div>
      )}
      <div className="flex items-center">
        <AlertCircleIcon className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
        <div className="flex-1">
          <AlertTitle className="text-sm font-semibold text-orange-700">{title}</AlertTitle>
          <AlertDescription className="text-xs text-orange-600 leading-tight">{message}</AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 h-6 w-6 text-orange-500 hover:text-orange-700 hover:bg-orange-100 flex-shrink-0"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </Alert>
  )
}

/* ==========================================================================
DashboardStats Component (includes StatCard)
========================================================================== */
interface StatCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  variant?: "default" | "warning" | "success"
}

function StatCard({ title, value, icon, variant = "default" }: StatCardProps) {
  const iconColorClass =
    variant === "warning" ? "text-amber-600" : variant === "success" ? "text-green-600" : "text-primary"
  const iconBgClass = variant === "warning" ? "bg-amber-100" : variant === "success" ? "bg-green-100" : "bg-orange-100"

  return (
    <Card className="shadow-sm rounded-lg bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
        <CardTitle className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">{title}</CardTitle>
        <div className={cn("p-1 rounded-md", iconBgClass, iconColorClass)}>{icon}</div>
      </CardHeader>
      <CardContent className="pb-2 pt-0 px-3">
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  )
}

function DashboardStats() {
  return (
    <>
      <StatCard title="Pending Orders" value={0} icon={<Clock className="h-3.5 w-3.5" />} />
      <StatCard
        title="Delayed Orders"
        value={10}
        icon={<AlertCircleIcon className="h-3.5 w-3.5" />}
        variant="warning"
      />
      <StatCard title="Out of Stock" value={4} icon={<PackageIcon className="h-3.5 w-3.5" />} />
      <StatCard title="Total Products" value={400} icon={<PackageCheck className="h-3.5 w-3.5" />} variant="success" />
    </>
  )
}

/* ==========================================================================
BusinessMetrics Component
========================================================================== */
const initialChartData = [
  { date: "Jan", sales: 65, orders: 28 },
  { date: "Feb", sales: 59, orders: 48 },
  { date: "Mar", sales: 80, orders: 40 },
  { date: "Apr", sales: 81, orders: 19 },
  { date: "May", sales: 56, orders: 86 },
  { date: "Jun", sales: 75, orders: 60 },
]
const weeklyData = [
  { date: "Mon", sales: 15, orders: 5 },
  { date: "Tue", sales: 20, orders: 8 },
  { date: "Wed", sales: 18, orders: 6 },
  { date: "Thu", sales: 25, orders: 10 },
  { date: "Fri", sales: 30, orders: 12 },
]

function BusinessMetrics() {
  const [timeframe, setTimeframe] = useState("Last 6 Months")
  const [chartData, setChartData] = useState(initialChartData)

  const handleTimeframeChange = (newTimeframe: string, data: typeof initialChartData) => {
    setTimeframe(newTimeframe)
    setChartData(data)
  }
  const totalSales = chartData.reduce((acc, item) => acc + item.sales, 0)
  const totalOrders = chartData.reduce((acc, item) => acc + item.orders, 0)

  return (
    <Card className="bg-card shadow-sm rounded-lg h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-3 px-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">Business Metrics</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">{timeframe}</CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 text-[11px] px-2 rounded-md"
            >
              <Calendar className="h-3 w-3" />
              Filter
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleTimeframeChange("Last 6 Months", initialChartData)}>
              Last 6 Months
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTimeframeChange("Last Week", weeklyData)}>
              Last Week
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pt-1 px-3 pb-2">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center p-1.5 rounded-md bg-orange-50 border border-orange-100">
            <TrendingUp className="h-3.5 w-3.5 text-primary mr-1 shrink-0" />
            <div>
              <p className="text-[9px] text-muted-foreground">Total Sales</p>
              <p className="text-[11px] font-semibold text-foreground">${totalSales.toFixed(2)}k</p>
            </div>
          </div>
          <div className="flex items-center p-1.5 rounded-md bg-sky-50 border border-sky-100">
            <ShoppingCart className="h-3.5 w-3.5 text-sky-500 mr-1 shrink-0" />
            <div>
              <p className="text-[9px] text-muted-foreground">Total Orders</p>
              <p className="text-[11px] font-semibold text-foreground">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-[120px]">
          <ChartContainer
            config={{
              sales: { label: "Sales ($k)", color: "hsl(var(--primary))" }, // Orange
              orders: { label: "Orders", color: "hsl(205 80% 55%)" }, // Blue
            }}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 0, left: -25, bottom: 0 }}
                barGap={4}
                barCategoryGap="20%"
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.3)" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  fontSize={8}
                  className="text-muted-foreground"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  fontSize={8}
                  className="text-muted-foreground"
                  domain={[0, "dataMax + 20"]}
                />
                <ChartTooltip
                  cursor={{ fill: "hsl(var(--muted) / 0.5)" }} // Lighter fill for cursor
                  content={
                    <ChartTooltipContent
                      indicator="dot" // Changed indicator for bar chart context
                      className="bg-card shadow-lg rounded-md text-[9px] p-1.5 border border-border/50"
                    />
                  }
                />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

/* ==========================================================================
ProductsUpload Component (Quick Actions)
========================================================================== */
interface QuickActionButtonProps {
  icon: React.ElementType
  line1: string
  line2: string
  href: string
}

function QuickActionButton({ icon: Icon, line1, line2, href }: QuickActionButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center p-3 rounded-lg bg-white hover:bg-orange-50 border border-orange-100 hover:border-orange-200 transition-all shadow-sm hover:shadow-md",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <div className="mr-3 p-2 bg-orange-100 rounded-md">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-orange-700">{line1}</p>
        <p className="text-xs text-slate-500">{line2}</p>
      </div>
    </Link>
  )
}

function ProductsUpload() {
  const actions = [
    { icon: PlusCircle, line1: "Add", line2: "Products", href: "/products" }, // Updated href
    { icon: ClipboardList, line1: "Check", line2: "Orders", href: "/orders" },
    { icon: CircleDollarSign, line1: "View", line2: "Balance", href: "/balance" }, // href was already correct
    { icon: HelpCircle, line1: "Need", line2: "Help?", href: "/help" }, // Updated icon, text, and href
  ]

  return (
    <Card className="bg-card shadow-sm rounded-lg h-full flex flex-col p-3 md:p-4">
      <h2 className="text-xl font-bold text-primary mb-3 md:mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 md:gap-4 flex-1">
        {actions.map((action) => (
          <QuickActionButton
            key={action.line2}
            icon={action.icon}
            line1={action.line1}
            line2={action.line2}
            href={action.href}
          />
        ))}
      </div>
    </Card>
  )
}

/* ==========================================================================
Main Dashboard Page Component
========================================================================== */

export default function DashboardPage() {
  const currentSellerScore = 88
  const sellerPulseTrend: "improving" | "declining" | "stable" = "improving"

  return (
    <main className="flex-1 p-3 md:p-4 overflow-y-auto bg-slate-50">
      {" "}
      {/* Added overflow-y-auto and bg-slate-50 */}
      <div className="h-full flex flex-col gap-2 md:gap-3">
        <div className="flex-shrink-0">
          <OnboardingProgress />
        </div>
        <div className="flex-shrink-0">
          <Notification
            title="🚀 Platform Updates & Seller Tips!"
            message="Explore new features and maximize your sales."
            isNew
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 flex-shrink-0">
          <DashboardStats />
        </div>
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3 overflow-hidden">
          <div className="lg:col-span-2 h-full overflow-hidden">
            <BusinessMetrics />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-3 md:gap-4 h-full">
            <div className="flex-shrink-0">
              {" "}
              {/* Wrapper for SellerPulse */}
              <SellerPulse score={currentSellerScore} trend={sellerPulseTrend} />
            </div>
            <div className="flex-1 min-h-0">
              {" "}
              {/* Wrapper for ProductsUpload, allowing it to take remaining space and scroll if needed */}
              <ProductsUpload /> {/* Ensure ProductsUpload is designed to fill height (e.g., h-full internally) */}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
