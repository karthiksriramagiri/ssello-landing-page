"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { SellerPulse } from "@/components/dashboard/seller-pulse" // Assuming this component exists and is styled
import { AlertCircle, ArrowRight, Clock, PackageX, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type React from "react"

interface MetricDetail {
  id: string
  title: string
  icon: React.ElementType
  iconColor: string
  weight: number // Percentage impact
  currentRate: number // e.g., 1.5 for 1.5%
  currentValue: number // e.g., 3 for 3 orders
  valueUnit: string // e.g., "orders", "incidents"
  targetRate: number // e.g., 2.0 for target < 2.0%
  description: string
  learnMoreLink: string
  isLowerBetter: boolean
}

interface SellerPulsePageData {
  overallScore: number
  trend: "improving" | "declining" | "stable"
  metrics: MetricDetail[]
}

const sellerPulsePageData: SellerPulsePageData = {
  overallScore: 78, // Example score
  trend: "improving",
  metrics: [
    {
      id: "cancellations",
      title: "Order Cancellations",
      icon: PackageX,
      iconColor: "text-red-500",
      weight: 20,
      currentRate: 1.5, // 1.5%
      currentValue: 3,
      valueUnit: "orders",
      targetRate: 2.0, // Target < 2.0%
      description: "Minimizing order cancellations initiated by you is crucial for customer satisfaction and trust.",
      learnMoreLink: "/help/seller-pulse/cancellations",
      isLowerBetter: true,
    },
    {
      id: "delayedDeliveries",
      title: "Delayed Deliveries",
      icon: Clock,
      iconColor: "text-amber-500",
      weight: 40,
      currentRate: 3.2, // 3.2%
      currentValue: 7,
      valueUnit: "orders",
      targetRate: 5.0, // Target < 5.0%
      description:
        "Ensuring orders are shipped and delivered within the promised timeframe impacts your score significantly.",
      learnMoreLink: "/help/seller-pulse/delayed-deliveries",
      isLowerBetter: true,
    },
    {
      id: "problematicOrders",
      title: "Problematic Orders",
      icon: ShieldAlert,
      iconColor: "text-purple-500",
      weight: 40,
      currentRate: 0.8, // 0.8%
      currentValue: 2,
      valueUnit: "reports",
      targetRate: 1.0, // Target < 1.0%
      description:
        "This includes orders with issues like incorrect items, damages, or other customer complaints requiring resolution.",
      learnMoreLink: "/help/seller-pulse/problematic-orders",
      isLowerBetter: true,
    },
  ],
}

function getPerformanceStatus(currentRate: number, targetRate: number, isLowerBetter: boolean) {
  const deviation = isLowerBetter ? currentRate / targetRate : targetRate / currentRate
  if (isLowerBetter) {
    if (currentRate <= targetRate) return { text: "Excellent", color: "text-green-600", progressColor: "bg-green-500" }
    if (currentRate <= targetRate * 1.25) return { text: "Good", color: "text-sky-600", progressColor: "bg-sky-500" }
    if (currentRate <= targetRate * 1.5) return { text: "Fair", color: "text-amber-600", progressColor: "bg-amber-500" }
    return { text: "Needs Improvement", color: "text-red-600", progressColor: "bg-red-500" }
  } else {
    // Higher is better logic (not used in current metrics but good to have)
    if (currentRate >= targetRate) return { text: "Excellent", color: "text-green-600", progressColor: "bg-green-500" }
    if (currentRate >= targetRate * 0.75) return { text: "Good", color: "text-sky-600", progressColor: "bg-sky-500" }
    if (currentRate >= targetRate * 0.5) return { text: "Fair", color: "text-amber-600", progressColor: "bg-amber-500" }
    return { text: "Needs Improvement", color: "text-red-600", progressColor: "bg-red-500" }
  }
}

export default function SellerPulsePage() {
  const { overallScore, trend, metrics } = sellerPulsePageData

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 bg-muted/40">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">Seller Pulse</h1>
        <div className="w-full sm:w-auto max-w-[180px] md:max-w-[200px]">
          <SellerPulse score={overallScore} trend={trend} title="Overall Performance" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Factors</CardTitle>
          <CardDescription>
            Your Seller Pulse score is influenced by these key metrics. Focus on these areas to improve your rating.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {metrics.map((metric) => {
            const status = getPerformanceStatus(metric.currentRate, metric.targetRate, metric.isLowerBetter)
            // For progress, if lower is better, a lower rate means higher progress towards 0.
            // Max progress value is 100. If currentRate is 0, progress is 100.
            // If currentRate is targetRate*2 or more, progress is 0.
            let progressValue = 0
            if (metric.isLowerBetter) {
              if (metric.currentRate === 0) {
                progressValue = 100
              } else {
                // Scale progress so that targetRate*2 is 0 progress, and 0 rate is 100 progress.
                progressValue = Math.max(0, 100 - (metric.currentRate / (metric.targetRate * 1.5)) * 100)
              }
            } else {
              // Higher is better: progress is currentRate / targetRate, capped at 100
              progressValue = Math.min(100, (metric.currentRate / metric.targetRate) * 100)
            }

            return (
              <Card key={metric.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <metric.icon className={cn("h-6 w-6", metric.iconColor)} />
                      <CardTitle className="text-lg">{metric.title}</CardTitle>
                    </div>
                    <span className="text-sm font-semibold text-primary">{metric.weight}% Impact</span>
                  </div>
                  <CardDescription className="text-xs pt-1">
                    Current: <span className="font-semibold">{metric.currentRate.toFixed(1)}%</span> (
                    {metric.currentValue} {metric.valueUnit}) &bull; Target: &lt; {metric.targetRate.toFixed(1)}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                  <Progress
                    value={progressValue}
                    className="h-2.5"
                    indicatorClassName={status.progressColor}
                    aria-label={`${metric.title} performance: ${status.text}`}
                  />
                  <p className={cn("text-sm font-semibold", status.color)}>Status: {status.text}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{metric.description}</p>
                </CardContent>
                <div className="p-4 pt-0">
                  <Button variant="link" asChild className="p-0 h-auto text-xs text-primary">
                    <Link href={metric.learnMoreLink}>
                      Learn More <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </Card>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Your Score</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            The Seller Pulse is a dynamic score that reflects your recent performance. It is calculated based on the
            weighted average of the metrics listed above over a defined period.
          </p>
          <p>
            A higher score generally leads to better visibility, customer trust, and potentially lower fees or access to
            exclusive platform benefits. Consistently meeting or exceeding targets is key to maintaining a strong Seller
            Pulse.
          </p>
          <div className="flex items-start gap-2 pt-2">
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p>
              For detailed calculation methods and specific time windows for each metric, please refer to our{" "}
              <Link href="/help/seller-pulse-guide" className="text-primary underline hover:text-primary/80">
                Seller Pulse Guide
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
