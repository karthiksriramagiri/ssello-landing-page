"use client"
import { Label } from "@/components/ui/label"
import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import {
  ChevronDown,
  FileText,
  MoreHorizontal,
  Printer,
  Search,
  Ship,
  Tag,
  User,
  ShoppingCart,
  AlertTriangle,
  PackageIcon,
  Store,
  Edit2,
  PlusCircle,
  Truck,
  CheckCircle2,
} from "lucide-react"
import type { DateRange } from "react-day-picker" // Import DateRange

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Remove DatePicker import if no longer used elsewhere, for now we keep it as it might be used by other components.
// import { DatePicker } from "@/components/ui/date-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker" // Import DateRangePicker
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CancelOrderModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  order: Order | null
  onConfirmCancellation: (orderId: string, reason: string, customReason?: string) => void
}

function CancelOrderModal({ isOpen, onOpenChange, order, onConfirmCancellation }: CancelOrderModalProps) {
  const [selectedReason, setSelectedReason] = useState("")
  const [customReason, setCustomReason] = useState("")

  useEffect(() => {
    if (isOpen) {
      setSelectedReason("")
      setCustomReason("")
    }
  }, [isOpen])

  const handleConfirm = () => {
    if (order && selectedReason) {
      if (selectedReason === "Other" && !customReason.trim()) {
        alert("Please provide a reason if 'Other' is selected.")
        return
      }
      onConfirmCancellation(order.id, selectedReason, selectedReason === "Other" ? customReason.trim() : undefined)
      onOpenChange(false)
    }
  }

  if (!order) return null

  const cancellationReasons = [
    "Out of Stock",
    "Defective Order",
    "Incorrect Item Shipped",
    "Incorrect/Misleading Product",
    "Other",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel Order: {order.orderId}</DialogTitle>
          <DialogDescription>
            Please select a reason for cancelling this order. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive" className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Cancelling this order may negatively impact your Seller Pulse score.</AlertDescription>
        </Alert>

        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="cancelReasonSelect" className="text-sm font-medium">
              Reason for Cancellation
            </Label>
            <Select value={selectedReason} onValueChange={setSelectedReason}>
              <SelectTrigger id="cancelReasonSelect" className="mt-1">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {cancellationReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedReason === "Other" && (
            <div>
              <Label htmlFor="customReason" className="text-sm font-medium">
                Please specify reason
              </Label>
              <Textarea
                id="customReason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Enter your reason for cancellation"
                className="mt-1 min-h-[80px]"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Back
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={!selectedReason || (selectedReason === "Other" && !customReason.trim())}
          >
            Confirm Cancellation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface OrderProduct {
  name: string
  price: number
  quantity: number
  sku: string
  imageUrl?: string
}

interface Marketplace {
  name: string
  countryCode: string
  logoUrl?: string
}

interface CarrierInfo {
  id: string
  name: string
}

interface Order {
  id: string
  orderId: string
  date: string
  slaDate: string
  slaStatus: "on-time" | "delayed" | "at-risk"
  products: OrderProduct[]
  customer: {
    name: string
    deliveryAddress: string
    country: string
    countryCode?: string
  }
  marketplace: Marketplace
  status: "Dispatch pending" | "In process" | "Validating Tracking" | "Shipped" | "Delivered" | "Cancelled"
  trackingCode?: string
  carrier?: CarrierInfo
  locationName: string
  labelUrl?: string
  totalAmount: number
}

const generateRandomOrderId = () => "ORD" + Math.floor(1000000 + Math.random() * 9000000)
const usWarehouseLocations = ["Los Angeles", "Miami", "Atlanta", "Washington", "San Antonio"]

const marketplaces: Marketplace[] = [
  { name: "Mercado Livre", countryCode: "BR", logoUrl: "/logos/mercado-libre.png" },
  { name: "Mercado Livre", countryCode: "AR", logoUrl: "/logos/mercado-libre.png" },
  { name: "Mercado Livre", countryCode: "MX", logoUrl: "/logos/mercado-libre.png" },
  { name: "Mercado Livre", countryCode: "CO", logoUrl: "/logos/mercado-libre.png" },
  { name: "Mercado Livre", countryCode: "CL", logoUrl: "/logos/mercado-libre.png" },
  { name: "Amazon", countryCode: "US", logoUrl: "/logos/amazon.png" },
  { name: "Amazon", countryCode: "MX", logoUrl: "/logos/amazon.png" },
  { name: "Amazon", countryCode: "CA", logoUrl: "/logos/amazon.png" },
  { name: "Coppel", countryCode: "MX", logoUrl: "/logos/coppel.png" },
  { name: "Walmart", countryCode: "MX", logoUrl: "/logos/walmart.png" },
  { name: "Walmart", countryCode: "US", logoUrl: "/logos/walmart.png" },
  { name: "Shopee", countryCode: "BR", logoUrl: "/placeholder.svg?height=20&width=80" },
  { name: "Magazine Luiza", countryCode: "BR", logoUrl: "/placeholder.svg?height=20&width=80" },
  { name: "Americanas", countryCode: "BR", logoUrl: "/placeholder.svg?height=20&width=80" },
  { name: "eBay", countryCode: "US", logoUrl: "/placeholder.svg?height=20&width=80" },
]

const carrierOptions: CarrierInfo[] = [
  { id: "fedex", name: "FedEx" },
  { id: "ups", name: "UPS" },
  { id: "dhl", name: "DHL Express" },
  { id: "usps", name: "USPS" },
  { id: "canada-post", name: "Canada Post" },
  { id: "purolator", name: "Purolator" },
  { id: "royal-mail", name: "Royal Mail" },
  { id: "parcelforce", name: "Parcelforce" },
  { id: "dpd", name: "DPD" },
  { id: "hermes", name: "Hermes (Evri)" },
  { id: "gls", name: "GLS" },
  { id: "tnt", name: "TNT" },
  { id: "chronopost", name: "Chronopost" },
  { id: "laposte-fr", name: "La Poste (France)" },
  { id: "deutsche-post", name: "Deutsche Post" },
  { id: "postnl", name: "PostNL" },
  { id: "bpost", name: "Bpost (Belgium)" },
  { id: "correos-es", name: "Correos (Spain)" },
  { id: "poste-it", name: "Poste Italiane" },
  { id: "postnord", name: "PostNord" },
  { id: "swiss-post", name: "Swiss Post" },
  { id: "austrian-post", name: "Austrian Post" },
  { id: "poczta-polska", name: "Poczta Polska" },
  { id: "japan-post", name: "Japan Post" },
  { id: "australia-post", name: "Australia Post" },
  { id: "china-post", name: "China Post" },
  { id: "ems", name: "EMS" },
  { id: "korea-post", name: "Korea Post" },
  { id: "singapore-post", name: "Singapore Post" },
  { id: "thailand-post", name: "Thailand Post" },
  { id: "india-post", name: "India Post" },
  { id: "aramex", name: "Aramex" },
  { id: "sf-express", name: "SF Express" },
  { id: "yanwen", name: "Yanwen" },
  { id: "cainiao", name: "Cainiao" },
  { id: "yunexpress", name: "YunExpress" },
  { id: "jtexpress", name: "J&T Express" },
  { id: "ninjavan", name: "Ninja Van" },
  { id: "fastway-au", name: "Fastway (Aramex AU)" },
  { id: "toll", name: "Toll Group" },
  { id: "correios-br", name: "Correios (Brazil)" },
  { id: "oca-ar", name: "OCA (Argentina)" },
  { id: "correo-ar", name: "Correo Argentino" },
  { id: "estafeta-mx", name: "Estafeta (Mexico)" },
  { id: "redpack-mx", name: "Redpack (Mexico)" },
  { id: "chilexpress", name: "Chilexpress" },
  { id: "servientrega-co", name: "Servientrega (Colombia)" },
  { id: "other", name: "Other (Specify)" },
]

function addBusinessDays(startDateString: string, days: number): string {
  const currentDate = new Date(startDateString + "T00:00:00Z")
  let businessDaysAdded = 0
  while (businessDaysAdded < days) {
    currentDate.setUTCDate(currentDate.getUTCDate() + 1)
    const dayOfWeek = currentDate.getUTCDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDaysAdded++
    }
  }
  return currentDate.toISOString().split("T")[0]
}

function determineSlaStatus(orderDateStr: string, slaDateStr: string): "on-time" | "delayed" | "at-risk" {
  const orderDate = new Date(orderDateStr + "T00:00:00Z")
  const slaDate = new Date(slaDateStr + "T00:00:00Z")
  const diffTime = slaDate.getTime() - orderDate.getTime()
  const orderIdNum = Number.parseInt(orderDateStr.slice(-2), 10)

  if (orderIdNum % 7 === 0) return "delayed"
  if (orderIdNum % 4 === 0) return "at-risk"
  return "on-time"
}

const mockOrdersData: Omit<Order, "slaDate" | "slaStatus">[] = [
  {
    id: "1",
    orderId: generateRandomOrderId(),
    date: "2023-11-01",
    products: [
      {
        name: "Mobile phone case with extended warranty and premium screen protector",
        price: 101.76,
        quantity: 1,
        sku: "MPC-EW-PSP-001",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Luciana Cohen",
      deliveryAddress: "Rua Augusta, 123, Consolação, São Paulo, SP, 01305-000",
      country: "Brazil",
      countryCode: "BR",
    },
    marketplace: marketplaces.find((m) => m.name === "Mercado Livre" && m.countryCode === "BR")!,
    status: "In process",
    trackingCode: "LP123456789BR",
    carrier: carrierOptions.find((c) => c.id === "dhl"),
    locationName: usWarehouseLocations[0],
    labelUrl: "#",
    totalAmount: 101.76,
  },
  {
    id: "2",
    orderId: generateRandomOrderId(),
    date: "2023-11-01",
    products: [
      {
        name: "Silk Shampoo Rich Moisturizing Cleanser - 500ml",
        price: 10.97,
        quantity: 1,
        sku: "SILK-SHMP-500ML",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Martina Ortiz",
      deliveryAddress: "Av. Callao, 456, Recoleta, Buenos Aires, C1022AAE",
      country: "Argentina",
      countryCode: "AR",
    },
    marketplace: marketplaces.find((m) => m.name === "Mercado Livre" && m.countryCode === "AR")!,
    status: "In process",
    locationName: usWarehouseLocations[1],
    labelUrl: "#",
    totalAmount: 10.97,
  },
  {
    id: "3",
    orderId: generateRandomOrderId(),
    date: "2023-10-28",
    products: [
      {
        name: "Wireless Gaming Mouse RGB",
        price: 49.99,
        quantity: 2,
        sku: "GM-RGB-007",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Carlos Silva",
      deliveryAddress: "Calle Madero, 789, Centro Histórico, Ciudad de México, CDMX, 06000",
      country: "Mexico",
      countryCode: "MX",
    },
    marketplace: marketplaces.find((m) => m.name === "Amazon" && m.countryCode === "MX")!,
    status: "Dispatch pending",
    locationName: usWarehouseLocations[2],
    labelUrl: "#",
    totalAmount: 99.98,
  },
  // ... (rest of mockOrdersData remains the same for brevity)
  {
    id: "4",
    orderId: generateRandomOrderId(),
    date: "2023-10-25",
    products: [
      {
        name: "Yoga Mat Premium Eco-Friendly",
        price: 25.0,
        quantity: 1,
        sku: "YOGA-ECO-PREM",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Water Bottle Stainless Steel Insulated 1L",
        price: 15.5,
        quantity: 1,
        sku: "WB-SS-INS-1L",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Ana Pereira",
      deliveryAddress: "Avenida Providencia 1010, Providencia, Santiago, RM",
      country: "Chile",
      countryCode: "CL",
    },
    marketplace: marketplaces.find((m) => m.name === "Coppel" && m.countryCode === "MX")!,
    status: "Shipped",
    trackingCode: "TRK987654321CL",
    carrier: carrierOptions.find((c) => c.id === "chilexpress"),
    locationName: usWarehouseLocations[3],
    labelUrl: "#",
    totalAmount: 40.5,
  },
  {
    id: "5",
    orderId: generateRandomOrderId(),
    date: "2023-11-02",
    products: [
      {
        name: "Smart LED TV 55 inch 4K UHD",
        price: 450.0,
        quantity: 1,
        sku: "TV-LED-55-4K",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Jorge Valdivia",
      deliveryAddress: "Av. Providencia, 1234, Providencia, Santiago, Región Metropolitana, 7500000",
      country: "Chile",
      countryCode: "CL",
    },
    marketplace: marketplaces.find((m) => m.name === "Mercado Livre" && m.countryCode === "CL")!,
    status: "Dispatch pending",
    locationName: usWarehouseLocations[4],
    labelUrl: "#",
    totalAmount: 450.0,
  },
  {
    id: "6",
    orderId: generateRandomOrderId(),
    date: "2023-11-03",
    products: [
      {
        name: "Men's Running Shoes - Size 10",
        price: 75.99,
        quantity: 1,
        sku: "SHOE-RUN-M-10",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Sofia Rodriguez",
      deliveryAddress: "Av. Insurgentes Sur 1000, Del Valle, Benito Juárez, Ciudad de México, CDMX, 03100",
      country: "Mexico",
      countryCode: "MX",
    },
    marketplace: marketplaces.find((m) => m.name === "Walmart" && m.countryCode === "MX")!,
    status: "In process",
    trackingCode: "WMX12345TRACK",
    carrier: carrierOptions.find((c) => c.id === "estafeta-mx"),
    locationName: usWarehouseLocations[0],
    labelUrl: "#",
    totalAmount: 75.99,
  },
  {
    id: "7",
    orderId: generateRandomOrderId(),
    date: "2023-11-04",
    products: [
      {
        name: "Bluetooth Headphones",
        price: 59.99,
        quantity: 1,
        sku: "BTHP-001",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "João Silva",
      deliveryAddress: "Avenida Rio Branco 123, Centro, Rio de Janeiro, RJ",
      country: "Brazil",
      countryCode: "BR",
    },
    marketplace: marketplaces.find((m) => m.name === "Amazon" && m.countryCode === "US")!,
    status: "Shipped",
    trackingCode: "1Z999AA10123456784",
    carrier: carrierOptions.find((c) => c.id === "ups"),
    locationName: usWarehouseLocations[1],
    totalAmount: 59.99,
  },
  {
    id: "8",
    orderId: generateRandomOrderId(),
    date: "2023-11-05",
    products: [
      {
        name: "Laptop Sleeve 13-inch",
        price: 19.99,
        quantity: 1,
        sku: "LSLV-13",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Jane Smith",
      deliveryAddress: "Calle Roble 456, Colonia Centro, Ciudad de México, CDMX",
      country: "Mexico",
      countryCode: "MX",
    },
    marketplace: marketplaces.find((m) => m.name === "Walmart" && m.countryCode === "MX")!,
    status: "In process",
    locationName: usWarehouseLocations[2],
    totalAmount: 19.99,
  },
  {
    id: "9",
    orderId: generateRandomOrderId(),
    date: "2023-11-06",
    products: [
      {
        name: "Coffee Maker Deluxe",
        price: 89.5,
        quantity: 1,
        sku: "CMDLX-01",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Roberto Carlos",
      deliveryAddress: "Av. Paulista, 1500, São Paulo, SP",
      country: "Brazil",
      countryCode: "BR",
    },
    marketplace: marketplaces.find((m) => m.name === "Coppel" && m.countryCode === "MX")!,
    status: "Dispatch pending",
    locationName: usWarehouseLocations[3],
    totalAmount: 89.5,
  },
  {
    id: "10",
    orderId: generateRandomOrderId(),
    date: "2023-11-07",
    products: [
      {
        name: "Smartphone Stand",
        price: 12.0,
        quantity: 2,
        sku: "SPSTND-02",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Maria Garcia",
      deliveryAddress: "Avenida Corrientes 280, San Nicolas, Buenos Aires, CABA",
      country: "Argentina",
      countryCode: "AR",
    },
    marketplace: marketplaces.find((m) => m.name === "Amazon" && m.countryCode === "US")!,
    status: "Shipped",
    trackingCode: "DHL987654321",
    carrier: carrierOptions.find((c) => c.id === "dhl"),
    locationName: usWarehouseLocations[4],
    totalAmount: 24.0,
  },
  {
    id: "11",
    orderId: generateRandomOrderId(),
    date: "2023-11-08",
    products: [
      {
        name: "Wireless Keyboard",
        price: 45.0,
        quantity: 1,
        sku: "WKBD-003",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "David Miller",
      deliveryAddress: "Paseo de la Reforma 789, Cuauhtémoc, Ciudad de México, CDMX",
      country: "Mexico",
      countryCode: "MX",
    },
    marketplace: marketplaces.find((m) => m.name === "Walmart" && m.countryCode === "US")!,
    status: "Delivered",
    trackingCode: "USPS123123123",
    carrier: carrierOptions.find((c) => c.id === "estafeta-mx"),
    locationName: usWarehouseLocations[0],
    totalAmount: 45.0,
  },
  {
    id: "12",
    orderId: generateRandomOrderId(),
    date: "2023-11-09",
    products: [
      {
        name: "Portable Charger 10000mAh",
        price: 29.99,
        quantity: 1,
        sku: "PCHG-10K",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Isabella Rossi",
      deliveryAddress: "Calle Moneda 10, Santiago Centro, Santiago, RM",
      country: "Chile",
      countryCode: "CL",
    },
    marketplace: marketplaces.find((m) => m.name === "Amazon" && m.countryCode === "US")!,
    status: "In process",
    locationName: usWarehouseLocations[1],
    totalAmount: 29.99,
  },
  {
    id: "13",
    orderId: generateRandomOrderId(),
    date: "2023-11-10",
    products: [
      {
        name: "Fitness Tracker Watch",
        price: 79.0,
        quantity: 1,
        sku: "FTW-005",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Ken Tanaka",
      deliveryAddress: "Rua Oscar Freire 111, Jardins, São Paulo, SP",
      country: "Brazil",
      countryCode: "BR",
    },
    marketplace: marketplaces.find((m) => m.name === "Amazon" && m.countryCode === "US")!,
    status: "Dispatch pending",
    locationName: usWarehouseLocations[2],
    totalAmount: 79.0,
  },
  {
    id: "14",
    orderId: generateRandomOrderId(),
    date: "2023-11-11",
    products: [
      {
        name: "Desk Lamp LED",
        price: 33.5,
        quantity: 1,
        sku: "DLAMP-LED",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Olivia Tremblay",
      deliveryAddress: "Avenida Santa Fe 123, Palermo, Buenos Aires, CABA",
      country: "Argentina",
      countryCode: "AR",
    },
    marketplace: marketplaces.find((m) => m.name === "Amazon" && m.countryCode === "CA")!,
    status: "Shipped",
    trackingCode: "CANPOST001",
    carrier: carrierOptions.find((c) => c.id === "correo-ar"),
    locationName: usWarehouseLocations[3],
    totalAmount: 33.5,
  },
  {
    id: "15",
    orderId: generateRandomOrderId(),
    date: "2023-11-12",
    products: [
      {
        name: "Travel Backpack 40L",
        price: 65.0,
        quantity: 1,
        sku: "TRBP-40L",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Lucas Müller",
      deliveryAddress: "Rua Augusta 200, Consolação, São Paulo, SP",
      country: "Brazil",
      countryCode: "BR",
    },
    marketplace: marketplaces.find((m) => m.name === "Walmart" && m.countryCode === "MX")!,
    status: "In process",
    locationName: usWarehouseLocations[4],
    totalAmount: 65.0,
  },
  {
    id: "16",
    orderId: generateRandomOrderId(),
    date: "2023-11-13",
    products: [
      {
        name: "Electric Toothbrush",
        price: 49.95,
        quantity: 1,
        sku: "ETBRUSH-01",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Chloe Dubois",
      deliveryAddress: "Avenida Presidente Masaryk 20, Polanco, Ciudad de México, CDMX",
      country: "Mexico",
      countryCode: "MX",
    },
    marketplace: marketplaces.find((m) => m.name === "Amazon" && m.countryCode === "US")!,
    status: "Dispatch pending",
    locationName: usWarehouseLocations[0],
    totalAmount: 49.95,
  },
  {
    id: "17",
    orderId: generateRandomOrderId(),
    date: "2023-11-14",
    products: [
      {
        name: "Yoga Block Set (2pcs)",
        price: 15.75,
        quantity: 1,
        sku: "YBLK-SET2",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Santiago Perez",
      deliveryAddress: "Paseo de la Reforma 222, CDMX, Mexico",
      country: "Mexico",
      countryCode: "MX",
    },
    marketplace: marketplaces.find((m) => m.name === "Mercado Livre" && m.countryCode === "MX")!,
    status: "Shipped",
    trackingCode: "ESTAFETA002",
    carrier: carrierOptions.find((c) => c.id === "estafeta-mx"),
    locationName: usWarehouseLocations[1],
    totalAmount: 15.75,
  },
  {
    id: "18",
    orderId: generateRandomOrderId(),
    date: "2023-11-15",
    products: [
      {
        name: "Insulated Tumbler 20oz",
        price: 22.0,
        quantity: 1,
        sku: "TUMBLR-20OZ",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Aisha Khan",
      deliveryAddress: "Apoquindo 10, Las Condes, Santiago, RM",
      country: "Chile",
      countryCode: "CL",
    },
    marketplace: marketplaces.find((m) => m.name === "Amazon" && m.countryCode === "US")!,
    status: "Delivered",
    trackingCode: "ROYALMAIL003",
    carrier: carrierOptions.find((c) => c.id === "chilexpress"),
    locationName: usWarehouseLocations[2],
    totalAmount: 22.0,
  },
  {
    id: "19",
    orderId: generateRandomOrderId(),
    date: "2023-11-16",
    products: [
      {
        name: "Gaming Headset Pro",
        price: 99.99,
        quantity: 1,
        sku: "GHPRO-X1",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Fatima Al Fassi",
      deliveryAddress: "Avenida Atlântica S/N, Copacabana, Rio de Janeiro, RJ",
      country: "Brazil",
      countryCode: "BR",
    },
    marketplace: marketplaces.find((m) => m.name === "Amazon" && m.countryCode === "US")!,
    status: "In process",
    locationName: usWarehouseLocations[3],
    totalAmount: 99.99,
  },
  {
    id: "20",
    orderId: generateRandomOrderId(),
    date: "2023-11-17",
    products: [
      {
        name: "Resistance Bands Set",
        price: 18.5,
        quantity: 1,
        sku: "RBANDS-SET",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Liam O'Connell",
      deliveryAddress: "Calle Florida 1, Microcentro, Buenos Aires, CABA",
      country: "Argentina",
      countryCode: "AR",
    },
    marketplace: marketplaces.find((m) => m.name === "Walmart" && m.countryCode === "MX")!,
    status: "Dispatch pending",
    locationName: usWarehouseLocations[4],
    totalAmount: 18.5,
  },
  {
    id: "21",
    orderId: generateRandomOrderId(),
    date: "2023-11-18",
    products: [
      {
        name: "Smart Plug Wi-Fi (2-pack)",
        price: 25.99,
        quantity: 1,
        sku: "SPLUG-WIFI2",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    customer: {
      name: "Chen Wei",
      deliveryAddress: "Avenida de los Insurgentes Sur 100, Roma Norte, Ciudad de México, CDMX",
      country: "Mexico",
      countryCode: "MX",
    },
    marketplace: marketplaces.find((m) => m.name === "Shopee" && m.countryCode === "BR")!,
    status: "Shipped",
    trackingCode: "CHINAPOST004",
    carrier: carrierOptions.find((c) => c.id === "estafeta-mx"),
    locationName: usWarehouseLocations[0],
    totalAmount: 25.99,
  },
]

const mockOrders: Order[] = mockOrdersData.map((orderData) => {
  const slaDate = addBusinessDays(orderData.date, 3)
  const slaStatus = determineSlaStatus(orderData.date, slaDate)
  return {
    ...orderData,
    slaDate,
    slaStatus,
  }
})

export default function OrdersPageModern() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const [searchBy, setSearchBy] = useState("order_id")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>(["Dispatch pending"])
  const [dateRange, setDateRange] = useState<DateRange | undefined>() // New state for date range

  const [editingOrderForTracking, setEditingOrderForTracking] = useState<Order | null>(null)
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null)

  const openCancelOrderModal = (order: Order) => {
    setOrderToCancel(order)
    setIsCancelModalOpen(true)
  }

  const handleConfirmCancellation = (orderId: string, reason: string, customReason?: string) => {
    setOrders((prevOrders) => prevOrders.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o)))
    const cancelledOrder = orders.find((o) => o.id === orderId)
    toast({
      title: "Order Cancelled",
      description: `Order ${cancelledOrder?.orderId} has been cancelled. Reason: ${reason}${customReason ? " - " + customReason : ""}.`,
      variant: "destructive",
    })
    setSelectedOrders((prev) => {
      const newSelected = new Set(prev)
      newSelected.delete(orderId)
      return newSelected
    })
  }

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedOrders(new Set(filteredOrders.map((o) => o.id)))
    } else {
      setSelectedOrders(new Set())
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    const newSelected = new Set(selectedOrders)
    if (checked) newSelected.add(orderId)
    else newSelected.delete(orderId)
    setSelectedOrders(newSelected)
  }

  const openEditTrackingModal = (order: Order) => {
    setEditingOrderForTracking(order)
    setIsTrackingModalOpen(true)
  }

  const handleSaveTrackingNumber = (
    orderId: string,
    trackingCode: string,
    carrierId: string,
    customCarrierName?: string,
  ) => {
    let carrierInfo: CarrierInfo | undefined
    if (carrierId === "other" && customCarrierName) {
      carrierInfo = { id: "other", name: customCarrierName }
    } else {
      carrierInfo = carrierOptions.find((c) => c.id === carrierId)
    }

    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === orderId
          ? { ...o, trackingCode: trackingCode, carrier: carrierInfo, status: "Validating Tracking" }
          : o,
      ),
    )
    toast({
      title: "Tracking Info Saved",
      description: `Order ${
        orders.find((o) => o.id === orderId)?.orderId
      } tracking updated. Status: Validating Tracking.`,
    })
  }

  const handleConfirmShipment = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.map((o) => (o.id === orderId ? { ...o, status: "Shipped" } : o)))
    toast({
      title: "Order Shipped",
      description: `Order ${orders.find((o) => o.id === orderId)?.orderId} has been marked as Shipped.`,
      variant: "success",
    })
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      let matchesSearch = true
      if (searchQuery.trim()) {
        const lowerQuery = searchQuery.toLowerCase()
        if (searchBy === "order_id") matchesSearch = order.orderId.toLowerCase().includes(lowerQuery)
        else if (searchBy === "product_id")
          matchesSearch = order.products.some((p) => p.name.toLowerCase().includes(lowerQuery))
        else if (searchBy === "customer_id")
          matchesSearch =
            order.customer.name.toLowerCase().includes(lowerQuery) ||
            order.customer.deliveryAddress.toLowerCase().includes(lowerQuery)
        else if (searchBy === "sku")
          matchesSearch = order.products.some((p) => p.sku.toLowerCase().includes(lowerQuery))
      }
      let matchesStatus = true
      if (statusFilter.length > 0 && !statusFilter.includes("all")) {
        matchesStatus = statusFilter.includes(order.status)
      }

      let matchesDate = true
      if (dateRange?.from) {
        const orderDate = new Date(order.date + "T00:00:00Z")
        if (orderDate < dateRange.from) matchesDate = false
        if (dateRange.to) {
          // Adjust 'to' date to be inclusive by setting time to end of day or comparing with start of next day
          const toDateEndOfDay = new Date(dateRange.to)
          toDateEndOfDay.setHours(23, 59, 59, 999) // Consider the whole 'to' day
          if (orderDate > toDateEndOfDay) matchesDate = false
        } else {
          // If only 'from' is selected, filter for dates on or after 'from'
          // This part is fine, but if 'to' is also part of the range, the above 'to' condition handles it.
        }
      }

      return matchesSearch && matchesStatus && matchesDate
    })
  }, [orders, searchBy, searchQuery, statusFilter, dateRange])

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter((prev) => {
      if (status === "all") return prev.includes("all") ? [] : ["all"]
      const newFilter = prev.filter((s) => s !== "all")
      if (newFilter.includes(status)) return newFilter.filter((s) => s !== status)
      return [...newFilter, status]
    })
  }

  const renderProductInfo = (order: Order) => {
    const firstProduct = order.products[0]
    if (!firstProduct) return <span className="text-xs text-muted-foreground">No product data</span>

    return (
      <div className="flex items-center gap-3">
        <img
          src={firstProduct.imageUrl || "/placeholder.svg?height=36&width=36&query=Product"}
          alt={firstProduct.name}
          className="h-9 w-9 rounded object-cover border bg-slate-50"
        />
        <div className="min-w-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm font-medium text-foreground truncate hover:text-primary transition-colors">
                <Link href={`/orders/${order.id}`}>{firstProduct.name}</Link>
              </p>
            </TooltipTrigger>
            <TooltipContent side="top" align="start" className="max-w-xs break-words">
              <p>{firstProduct.name}</p>
            </TooltipContent>
          </Tooltip>
          <div className="text-xs text-muted-foreground">
            <span>SKU: {firstProduct.sku}</span>
            {order.products.length > 1 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-2 font-medium text-primary cursor-pointer">
                    +{order.products.length - 1} more
                  </span>
                </TooltipTrigger>
                <TooltipContent className="text-xs p-2 max-w-xs">
                  <p className="font-semibold mb-1">Additional Products:</p>
                  <ul className="list-disc pl-4">
                    {order.products.slice(1).map((p, i) => (
                      <li key={i} className="truncate">
                        {p.name} (SKU: {p.sku})
                      </li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    )
  }

  function formatDate(dateString: string, format: "full" | "short" = "full"): string {
    const date = new Date(dateString + "T00:00:00Z")
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: format === "full" ? "long" : "short",
      day: "numeric",
      timeZone: "UTC",
    }
    return date.toLocaleDateString(undefined, options)
  }

  function getCityFromAddress(address: string): string {
    const parts = address.split(",")
    if (parts.length >= 2) {
      return parts[parts.length - 2].trim()
    }
    return address
  }

  const StatusBadge = ({ status }: { status: Order["status"] }) => {
    let badgeColor = "bg-gray-100 text-gray-700"
    if (status === "Dispatch pending") badgeColor = "bg-blue-100 text-blue-700"
    if (status === "In process") badgeColor = "bg-yellow-100 text-yellow-700"
    if (status === "Validating Tracking") badgeColor = "bg-purple-100 text-purple-700"
    if (status === "Shipped") badgeColor = "bg-green-100 text-green-700"
    if (status === "Delivered") badgeColor = "bg-green-500 text-white"
    if (status === "Cancelled") badgeColor = "bg-red-100 text-red-700"

    return (
      <div
        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-600/20 ${badgeColor}`}
      >
        {status}
      </div>
    )
  }

  const SLADisplay = ({ slaStatus, slaDate }: { slaStatus: "on-time" | "delayed" | "at-risk"; slaDate: string }) => {
    const slaDateFormatted = formatDate(slaDate, "short")
    let icon = null
    let textColor = "text-muted-foreground"
    let statusText = ""

    if (slaStatus === "on-time") {
      icon = <CheckCircle2 className="h-4 w-4 text-green-500" />
      textColor = "text-green-600"
      statusText = "On Time:"
    } else if (slaStatus === "at-risk") {
      icon = <AlertTriangle className="h-4 w-4 text-orange-500" />
      textColor = "text-orange-600"
      statusText = "At Risk:"
    } else if (slaStatus === "delayed") {
      icon = <AlertTriangle className="h-4 w-4 text-red-500" />
      textColor = "text-red-600"
      statusText = "Delayed:"
    }

    return (
      <div className="flex items-center gap-1.5">
        {icon}
        <span className={`text-xs font-medium ${textColor}`}>
          {statusText} {slaDateFormatted}
        </span>
      </div>
    )
  }

  const copyToClipboard = (text: string, toastFn: typeof toast) => {
    navigator.clipboard.writeText(text)
    toastFn({
      title: "Copied to clipboard",
      description: "Tracking code copied to clipboard.",
    })
  }

  const EditTrackingModal = ({
    isOpen,
    onOpenChange,
    order,
    onSave,
  }: {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    order: Order | null
    onSave: (orderId: string, trackingCode: string, carrierId: string, customCarrierName?: string) => void
  }) => {
    const [trackingCode, setTrackingCode] = useState("")
    const [carrierId, setCarrierId] = useState("")
    const [customCarrierName, setCustomCarrierName] = useState("")

    useEffect(() => {
      if (order) {
        setTrackingCode(order.trackingCode || "")
        const currentCarrierId = order.carrier?.id || ""
        setCarrierId(currentCarrierId)
        if (currentCarrierId === "other" && order.carrier?.name && order.carrier.name !== "Other (Specify)") {
          setCustomCarrierName(order.carrier.name)
        } else {
          setCustomCarrierName("")
        }
      } else {
        setTrackingCode("")
        setCarrierId("")
        setCustomCarrierName("")
      }
    }, [order])

    const handleSave = () => {
      if (order) {
        if (!trackingCode.trim()) {
          alert("Tracking code cannot be empty.")
          return
        }
        if (!carrierId) {
          alert("Please select a carrier.")
          return
        }
        if (carrierId === "other" && !customCarrierName.trim()) {
          alert("Please specify carrier name for 'Other'.")
          return
        }
        onSave(order.id, trackingCode, carrierId, customCarrierName)
        onOpenChange(false)
      }
    }

    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Tracking Information</DialogTitle>
            <DialogDescription>Update the tracking information for order {order?.orderId}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trackingCodeModal" className="text-right">
                Tracking Code
              </Label>
              <Input
                id="trackingCodeModal"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carrierModal" className="text-right">
                Carrier
              </Label>
              <Select value={carrierId} onValueChange={setCarrierId}>
                <SelectTrigger id="carrierModal" className="col-span-3">
                  <SelectValue placeholder="Select a carrier" />
                </SelectTrigger>
                <SelectContent>
                  {carrierOptions.map((carrier) => (
                    <SelectItem key={carrier.id} value={carrier.id}>
                      {carrier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {carrierId === "other" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customCarrierNameModal" className="text-right">
                  Carrier Name
                </Label>
                <Input
                  id="customCarrierNameModal"
                  value={customCarrierName}
                  onChange={(e) => setCustomCarrierName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const SearchByIcon = ({ type }: { type: string }) => {
    if (type === "order_id") return <Tag className="h-4 w-4" />
    if (type === "product_id") return <PackageIcon className="h-4 w-4" />
    if (type === "customer_id") return <User className="h-4 w-4" />
    if (type === "sku") return <ShoppingCart className="h-4 w-4" />
    return <Search className="h-4 w-4" />
  }

  const orderStatusOptions = [
    "Dispatch pending",
    "In process",
    "Validating Tracking",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex flex-1 flex-col bg-slate-100 dark:bg-slate-900">
        <header className="bg-white dark:bg-slate-800 shadow-sm p-4 md:p-5 sticky top-0 z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h1 className="text-2xl font-semibold text-foreground">Orders Management</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white">
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Export XLS
              </Button>
              <Button variant="outline" size="sm" className="bg-white">
                <Printer className="h-3.5 w-3.5 mr-1.5" />
                Download Labels
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Ship className="h-3.5 w-3.5 mr-1.5" />
                Mark as Shipped
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-5 space-y-5">
          <Card className="shadow-md border border-slate-200 dark:border-slate-700">
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
                <div>
                  <Label htmlFor="searchBy" className="text-xs font-medium text-muted-foreground">
                    Search by
                  </Label>
                  <div className="flex items-center mt-1">
                    <Select value={searchBy} onValueChange={setSearchBy}>
                      <SelectTrigger className="h-9 rounded-r-none border-r-0 w-[50px] bg-slate-50 dark:bg-slate-700">
                        <SelectValue>
                          <SearchByIcon type={searchBy} className="dark:text-slate-400" />
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order_id">Order #</SelectItem>
                        <SelectItem value="product_id">Product</SelectItem>
                        <SelectItem value="customer_id">Customer/Address</SelectItem>
                        <SelectItem value="sku">SKU</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="searchQuery"
                      placeholder="Enter search term..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9 rounded-l-none flex-1 dark:bg-slate-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="statusFilter" className="text-xs font-medium text-muted-foreground">
                    Status
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between h-9 mt-1 font-normal bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600"
                      >
                        <span className="truncate">
                          {statusFilter.length === 0 || statusFilter.includes("all")
                            ? "All Statuses"
                            : statusFilter.join(", ")}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                      <DropdownMenuCheckboxItem
                        checked={statusFilter.includes("all") || statusFilter.length === 0}
                        onCheckedChange={() => handleStatusFilterChange("all")}
                      >
                        All Statuses
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      {orderStatusOptions.map((status) => (
                        <DropdownMenuCheckboxItem
                          key={status}
                          checked={statusFilter.includes(status)}
                          onCheckedChange={() => handleStatusFilterChange(status)}
                          onSelect={(e) => e.preventDefault()}
                        >
                          {status}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="lg:col-span-1">
                  {" "}
                  {/* Adjusted for single date range picker */}
                  <Label htmlFor="dateRange" className="text-xs font-medium text-muted-foreground">
                    Order Date Range
                  </Label>
                  <DateRangePicker
                    date={dateRange}
                    setDate={setDateRange}
                    placeholder="Select date range"
                    buttonClassName="h-9 mt-1"
                    className="mt-1"
                  />
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter(["Dispatch pending"])
                    setDateRange(undefined) // Clear date range
                  }}
                  className="h-9 text-muted-foreground hover:text-primary self-end" // Ensure button aligns well
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader className="bg-slate-50 dark:bg-slate-700/50">
                  <TableRow>
                    <TableHead className="w-[40px] px-3 py-3">
                      <Checkbox
                        checked={
                          selectedOrders.size === filteredOrders.length && filteredOrders.length > 0
                            ? true
                            : selectedOrders.size > 0
                              ? "indeterminate"
                              : false
                        }
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all rows"
                      />
                    </TableHead>
                    <TableHead className="w-[110px] px-3 py-3 text-xs text-muted-foreground font-semibold">
                      Date
                    </TableHead>
                    <TableHead className="w-[120px] px-3 py-3 text-xs text-muted-foreground font-semibold">
                      Order #
                    </TableHead>
                    <TableHead className="min-w-[280px] px-3 py-3 text-xs text-muted-foreground font-semibold">
                      Product Info
                    </TableHead>
                    <TableHead className="w-[150px] px-3 py-3 text-xs text-muted-foreground font-semibold">
                      Marketplace
                    </TableHead>
                    <TableHead className="w-[180px] px-3 py-3 text-xs text-muted-foreground font-semibold">
                      Customer
                    </TableHead>
                    <TableHead className="w-[100px] px-3 py-3 text-xs text-muted-foreground font-semibold text-right">
                      Total
                    </TableHead>
                    <TableHead className="w-[140px] px-3 py-3 text-xs text-muted-foreground font-semibold text-center">
                      Status
                    </TableHead>
                    <TableHead className="w-[130px] px-3 py-3 text-xs text-muted-foreground font-semibold">
                      Deliver by
                    </TableHead>
                    <TableHead className="w-[200px] px-3 py-3 text-xs text-muted-foreground font-semibold">
                      Tracking
                    </TableHead>
                    <TableHead className="w-[150px] px-3 py-3 text-xs text-muted-foreground font-semibold">
                      Location
                    </TableHead>
                    <TableHead className="w-[50px] px-3 py-3 text-xs text-muted-foreground font-semibold text-right sticky right-0 bg-slate-50 dark:bg-slate-700/50 z-[1]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow
                        key={order.id}
                        data-state={selectedOrders.has(order.id) ? "selected" : ""}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <TableCell className="px-3 py-2.5">
                          <Checkbox
                            checked={selectedOrders.has(order.id)}
                            onCheckedChange={(checked) => handleSelectOrder(order.id, !!checked)}
                            aria-label={`Select order ${order.orderId}`}
                          />
                        </TableCell>
                        <TableCell className="px-3 py-2.5 text-xs text-muted-foreground">
                          {formatDate(order.date, "full")}
                        </TableCell>
                        <TableCell className="px-3 py-2.5 text-xs font-medium text-foreground">
                          {order.orderId}
                        </TableCell>
                        <TableCell className="px-3 py-2.5 align-top">{renderProductInfo(order)}</TableCell>
                        <TableCell className="px-3 py-2.5 align-top">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center justify-start h-full">
                                {" "}
                                {/* Ensure vertical centering if needed, and justify-start */}
                                {order.marketplace.logoUrl ? (
                                  <img
                                    src={
                                      order.marketplace.logoUrl ||
                                      "/placeholder.svg?height=20&width=80&query=Marketplace+Logo" ||
                                      "/placeholder.svg"
                                    }
                                    alt={`${order.marketplace.name} logo`}
                                    className="h-5 w-auto object-contain max-h-[20px]" // Removed mr-1.5, slightly increased height for better visibility
                                  />
                                ) : (
                                  <Store className="h-5 w-5 text-muted-foreground flex-shrink-0" /> // Removed mr-1.5, slightly increased size
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="center">
                              <p>{order.marketplace.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="px-3 py-2.5 align-top">
                          <p className="text-sm font-medium text-foreground truncate">{order.customer.name}</p>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="text-xs text-muted-foreground cursor-default">
                                <p className="truncate">
                                  {getCityFromAddress(order.customer.deliveryAddress)}, {order.customer.country} (
                                  {order.customer.countryCode})
                                </p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="text-xs bg-background text-foreground border p-2 max-w-xs">
                              <p className="font-semibold">Full Address:</p>
                              <p>{order.customer.deliveryAddress}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="px-3 py-2.5 text-xs font-medium text-foreground text-right">
                          ${order.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell className="px-3 py-2.5 align-top text-center">
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="px-3 py-2.5">
                          <SLADisplay slaStatus={order.slaStatus} slaDate={order.slaDate} />
                        </TableCell>
                        <TableCell className="px-3 py-2.5 text-xs text-muted-foreground align-top">
                          {order.trackingCode ? (
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-1">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className="truncate cursor-pointer hover:text-primary font-medium text-foreground"
                                      onClick={() => copyToClipboard(order.trackingCode!, toast)}
                                    >
                                      {order.trackingCode}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent className="text-xs">Copy Tracking Code</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-5 w-5 text-muted-foreground hover:text-primary"
                                      onClick={() => openEditTrackingModal(order)}
                                      disabled={order.status === "Delivered" || order.status === "Cancelled"}
                                    >
                                      <Edit2 className="h-3 w-3" />
                                      <span className="sr-only">Edit Tracking</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit Tracking</TooltipContent>
                                </Tooltip>
                              </div>
                              {order.carrier && (
                                <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                                  <Truck className="h-3 w-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{order.carrier.name}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="xs"
                              className="h-7 px-2 py-1 text-xs bg-white"
                              onClick={() => openEditTrackingModal(order)}
                              disabled={order.status === "Delivered" || order.status === "Cancelled"}
                            >
                              <PlusCircle className="h-3 w-3 mr-1" />
                              Add Tracking
                            </Button>
                          )}
                        </TableCell>
                        <TableCell className="px-3 py-2.5 align-top">
                          <p className="text-xs text-foreground truncate">{order.locationName}</p>
                        </TableCell>
                        <TableCell className="px-3 py-2.5 align-top text-right sticky right-0 bg-white dark:bg-slate-800/80 backdrop-blur-sm z-[1]">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Order actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="text-xs">
                              <DropdownMenuItem
                                onClick={() => handleConfirmShipment(order.id)}
                                disabled={order.status !== "Validating Tracking"}
                              >
                                <Ship className="mr-2 h-3.5 w-3.5" />
                                Mark as Shipped
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openEditTrackingModal(order)}
                                disabled={order.status === "Delivered" || order.status === "Cancelled"}
                              >
                                <Edit2 className="mr-2 h-3.5 w-3.5" />
                                Edit Tracking Info
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600 hover:!text-red-600 focus:!text-red-600 focus:!bg-red-50 dark:focus:!bg-red-700/20"
                                onClick={() => openCancelOrderModal(order)}
                                disabled={order.status === "Cancelled" || order.status === "Delivered"}
                              >
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={12} className="h-32 text-center text-muted-foreground text-sm">
                        <PackageIcon className="mx-auto h-10 w-10 text-slate-400 mb-2" />
                        No orders found.
                        <br />
                        Try adjusting your filters or check back later.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {filteredOrders.length > 0 && (
              <div className="p-3 border-t dark:border-slate-700 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {selectedOrders.size} of {filteredOrders.length} order(s) selected.
                </span>
                <span>Page 1 of 1</span>
              </div>
            )}
          </Card>
        </main>
      </div>
      <EditTrackingModal
        isOpen={isTrackingModalOpen}
        onOpenChange={setIsTrackingModalOpen}
        order={editingOrderForTracking}
        onSave={handleSaveTrackingNumber}
      />
      <CancelOrderModal
        isOpen={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        order={orderToCancel}
        onConfirmCancellation={handleConfirmCancellation}
      />
    </TooltipProvider>
  )
}
