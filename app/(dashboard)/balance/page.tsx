"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertTriangle, ArrowUpRight, CircleHelp, Download, Landmark } from "lucide-react"
import Link from "next/link"

// Mock data for accumulated balance
const accumulatedBalanceData = {
  sales: 12500.75,
  cancellations: -350.2,
  fees: -120.5,
  subscriptionFees: -49.99,
  otherConcepts: -15.0,
  total: 11965.06, // Calculated as: 12500.75 - 350.20 - 120.50 - 49.99 - 15.00
}

// Mock data for report history
const reportHistoryData: any[] = []

export default function BalancePage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 bg-muted/40">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold">Balance</h1>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <Landmark className="h-8 w-8 text-primary" />
            <CardTitle className="text-xl font-semibold">Balance Sheet</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground">
                    <CircleHelp className="h-4 w-4" />
                    <span className="sr-only">More info about Balance Sheet</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is your current estimated balance.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/balance/details">
                    {" "}
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="sr-only">View detailed balance report</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View detailed report</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 pt-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Sales</span>
              <span className="text-sm font-medium">US$ {accumulatedBalanceData.sales.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-red-600">Cancellations</span>
              <span className="text-sm font-medium text-red-600">
                US$ {accumulatedBalanceData.cancellations.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-red-600">Fees</span>
              <span className="text-sm font-medium text-red-600">US$ {accumulatedBalanceData.fees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-red-600">Subscription Fees</span>
              <span className="text-sm font-medium text-red-600">
                US$ {accumulatedBalanceData.subscriptionFees.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-red-600">Other</span>
              <span className="text-sm font-medium text-red-600">
                US$ {accumulatedBalanceData.otherConcepts.toFixed(2)}
              </span>
            </div>
            <hr className="my-2 border-dashed" />
            <div className="flex justify-between">
              <span className="text-base font-semibold text-primary">Total</span>
              <span className="text-base font-semibold text-primary">
                US$ {accumulatedBalanceData.total.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Report history</h2>
        <Alert variant="default" className="bg-amber-50 border-amber-300 text-amber-800">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="font-semibold">Important</AlertTitle>
          <AlertDescription>
            Please note that in order to receive payments, you must reach a minimum of accumulated balance of U$S 500.
            For more information please visit{" "}
            <Link href="/help-center" className="font-medium underline hover:text-amber-900">
              Help Center
            </Link>
            {"."} {/* This was the key fix for the period */}
          </AlertDescription>
        </Alert>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="whitespace-nowrap">Report date</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Sales</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Cancellations</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Fees</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Subscription Fees</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Other amounts</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Total amount</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="text-center whitespace-nowrap">Download report</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportHistoryData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                      There are no items to show
                    </TableCell>
                  </TableRow>
                ) : (
                  reportHistoryData.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.date}</TableCell>
                      <TableCell className="text-right">US$ {report.sales.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-red-600">US$ {report.cancellations.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-red-600">US$ {report.fees.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-red-600">
                        US$ {report.subscriptionFees.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-red-600">US$ {report.otherAmounts.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium">US$ {report.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{report.status}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <div className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">Total: {reportHistoryData.length}</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Items per page:</span>
              <Select defaultValue="10">
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
