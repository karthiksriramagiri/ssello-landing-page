"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpDown,
  Edit3,
  MoreHorizontal,
  PackageSearch,
  Search,
  DollarSign,
  Archive,
  TrendingDownIcon,
  ListFilter,
  Check,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { ProductBatchEntryForm } from "@/components/products/product-batch-entry-form"
import { BulkUploadModal } from "@/components/products/bulk-upload-modal"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  imageUrl: string
  name: string
  condition: string
  sku: string
  location: string
  cost: number
  priceNew: number
  sellingPrice: number
  buybox: boolean
  quantity: number
  createdDate: string
  sold: number
}

const initialMockProducts: Product[] = [
  {
    id: "1",
    imageUrl: "/placeholder.svg?height=40&width=40",
    name: "JBL Charge 4 - Waterproof Portable Bluetooth Speaker",
    condition: "New",
    sku: "RYO-JBL-0007",
    location: "A10",
    cost: 102.0,
    priceNew: 0.0,
    sellingPrice: 99.0,
    buybox: true,
    quantity: 3,
    createdDate: "2024-05-15",
    sold: 0,
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg?height=40&width=40",
    name: "Apple AirPods Pro 2 Wireless Earbuds",
    condition: "New",
    sku: "RYO-APP-0006",
    location: "A8",
    cost: 212.0,
    priceNew: 0.0,
    sellingPrice: 199.0,
    buybox: true,
    quantity: 5,
    createdDate: "2024-05-10",
    sold: 12,
  },
  {
    id: "3",
    imageUrl: "/placeholder.svg?height=40&width=40",
    name: "Beats Solo 4 - Wireless Bluetooth On-Ear Headphones",
    condition: "Used - Like New",
    sku: "RYO-BEA-0005",
    location: "B3",
    cost: 123.0,
    priceNew: 0.0,
    sellingPrice: 149.0,
    buybox: false,
    quantity: 1,
    createdDate: "2024-04-20",
    sold: 2,
  },
  {
    id: "4",
    imageUrl: "/placeholder.svg?height=40&width=40",
    name: "Samsung Galaxy Watch 6",
    condition: "New",
    sku: "SAM-WAT-0012",
    location: "C1",
    cost: 250.0,
    priceNew: 0.0,
    sellingPrice: 299.99,
    buybox: true,
    quantity: 10,
    createdDate: "2024-03-01",
    sold: 5,
  },
]

interface InventoryStatCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  iconColor?: string
}

function InventoryStatCard({ title, value, icon: Icon, iconColor = "text-primary" }: InventoryStatCardProps) {
  return (
    <Card className="shadow-lg bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", iconColor)} />
      </CardHeader>
      <CardContent className="pb-3 px-4">
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialMockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false)

  const [editingPriceProductId, setEditingPriceProductId] = useState<string | null>(null)
  const [currentEditPrice, setCurrentEditPrice] = useState<string>("")
  const [showPriceConfirmDialog, setShowPriceConfirmDialog] = useState(false)
  const [productForPriceConfirmation, setProductForPriceConfirmation] = useState<Product | null>(null)
  const [newPriceForConfirmation, setNewPriceForConfirmation] = useState<number | null>(null)

  const [editingQuantityProductId, setEditingQuantityProductId] = useState<string | null>(null)
  const [currentEditQuantity, setCurrentEditQuantity] = useState<string>("")
  const [showQuantityConfirmDialog, setShowQuantityConfirmDialog] = useState(false)
  const [productForQuantityConfirmation, setProductForQuantityConfirmation] = useState<Product | null>(null)
  const [newQuantityForConfirmation, setNewQuantityForConfirmation] = useState<number | null>(null)

  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false)
  const [productForDeletion, setProductForDeletion] = useState<Product | null>(null)

  const { toast } = useToast()

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedProducts(new Set(products.map((p) => p.id)))
    } else {
      setSelectedProducts(new Set())
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    const newSelected = new Set(selectedProducts)
    if (checked) {
      newSelected.add(productId)
    } else {
      newSelected.delete(productId)
    }
    setSelectedProducts(newSelected)
  }

  const handleEditPriceClick = (product: Product) => {
    setEditingPriceProductId(product.id)
    setCurrentEditPrice(product.sellingPrice.toFixed(2))
    setEditingQuantityProductId(null)
  }

  const handleCancelEditPrice = () => {
    setEditingPriceProductId(null)
    setCurrentEditPrice("")
  }

  const handleAttemptSavePrice = () => {
    if (!editingPriceProductId) return
    const productToEdit = products.find((p) => p.id === editingPriceProductId)
    if (!productToEdit) return
    const newPrice = Number.parseFloat(currentEditPrice)
    if (isNaN(newPrice) || newPrice < 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid positive number for the price.",
        variant: "destructive",
      })
      return
    }
    if (newPrice === productToEdit.sellingPrice) {
      handleCancelEditPrice()
      return
    }
    setProductForPriceConfirmation(productToEdit)
    setNewPriceForConfirmation(newPrice)
    setShowPriceConfirmDialog(true)
  }

  const handleConfirmPriceChange = () => {
    if (!productForPriceConfirmation || newPriceForConfirmation === null) return
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productForPriceConfirmation.id ? { ...p, sellingPrice: newPriceForConfirmation } : p,
      ),
    )
    toast({
      title: "Price Updated",
      description: `FOB Price for ${productForPriceConfirmation.name} changed to $${newPriceForConfirmation.toFixed(2)}.`,
    })
    setShowPriceConfirmDialog(false)
    handleCancelEditPrice()
    setProductForPriceConfirmation(null)
    setNewPriceForConfirmation(null)
  }

  const handleEditQuantityClick = (product: Product) => {
    setEditingQuantityProductId(product.id)
    setCurrentEditQuantity(product.quantity.toString())
    setEditingPriceProductId(null)
  }

  const handleCancelEditQuantity = () => {
    setEditingQuantityProductId(null)
    setCurrentEditQuantity("")
  }

  const handleAttemptSaveQuantity = () => {
    if (!editingQuantityProductId) return
    const productToEdit = products.find((p) => p.id === editingQuantityProductId)
    if (!productToEdit) return
    const newQuantity = Number.parseInt(currentEditQuantity, 10)
    if (isNaN(newQuantity) || newQuantity < 0 || !Number.isInteger(newQuantity)) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid non-negative whole number for the quantity.",
        variant: "destructive",
      })
      return
    }
    if (newQuantity === productToEdit.quantity) {
      handleCancelEditQuantity()
      return
    }
    setProductForQuantityConfirmation(productToEdit)
    setNewQuantityForConfirmation(newQuantity)
    setShowQuantityConfirmDialog(true)
  }

  const handleConfirmQuantityChange = () => {
    if (!productForQuantityConfirmation || newQuantityForConfirmation === null) return
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productForQuantityConfirmation.id ? { ...p, quantity: newQuantityForConfirmation } : p,
      ),
    )
    toast({
      title: "Quantity Updated",
      description: `Quantity for ${productForQuantityConfirmation.name} changed to ${newQuantityForConfirmation}.`,
    })
    setShowQuantityConfirmDialog(false)
    handleCancelEditQuantity()
    setProductForQuantityConfirmation(null)
    setNewQuantityForConfirmation(null)
  }

  const handleDeleteProductClick = (product: Product) => {
    setProductForDeletion(product)
    setShowDeleteConfirmDialog(true)
  }

  const handleConfirmDelete = () => {
    if (!productForDeletion) return
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productForDeletion.id))
    toast({
      title: "Product Deleted",
      description: `${productForDeletion.name} has been removed.`,
    })
    setShowDeleteConfirmDialog(false)
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected)
      newSelected.delete(productForDeletion.id)
      return newSelected
    })
    setProductForDeletion(null)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString + "T00:00:00")
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch (e) {
      return dateString
    }
  }

  return (
    <>
      <main className="flex-1 flex flex-col p-4 md:p-5 gap-5 md:gap-6 bg-slate-100 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h1 className="text-3xl font-semibold text-foreground mb-1">Products</h1>
        </div>

        <Card className="shadow-lg bg-white">
          <ProductBatchEntryForm />
        </Card>

        <div className="flex flex-col md:flex-row items-center gap-3 p-4 bg-white border rounded-lg shadow-lg">
          <div className="relative flex-grow w-full md:max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or SKU..."
              className="w-full pl-8 pr-2 py-2 h-9 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1 bg-white">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="text-xs">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>Condition</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Stock Level</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Created Date</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InventoryStatCard title="Total Products" value={products.length} icon={PackageSearch} />
          <InventoryStatCard
            title="Total Inventory Value"
            value={`$${products.reduce((sum, p) => sum + p.cost * p.quantity, 0).toLocaleString()}`}
            icon={DollarSign}
          />
          <InventoryStatCard
            title="Items in Stock"
            value={products.reduce((sum, p) => sum + p.quantity, 0)}
            icon={Archive}
            iconColor="text-green-600"
          />
          <InventoryStatCard
            title="Low Stock Items"
            value={products.filter((p) => p.quantity < 2).length}
            icon={TrendingDownIcon}
            iconColor="text-red-500"
          />
        </div>

        <Card className="shadow-xl bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-200/70 hover:bg-slate-200/70">
                  <TableHead className="w-[50px] px-3 py-3">
                    <Checkbox
                      checked={
                        selectedProducts.size === products.length && products.length > 0
                          ? true
                          : selectedProducts.size > 0
                            ? "indeterminate"
                            : false
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all rows"
                    />
                  </TableHead>
                  <TableHead className="w-[70px] px-3 py-3 text-xs text-slate-700 font-semibold">Image</TableHead>
                  <TableHead className="min-w-[280px] px-3 py-3 text-xs text-slate-700 font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-xs -ml-1 font-semibold text-slate-700 hover:bg-transparent hover:text-primary"
                    >
                      Title / Details
                      <ArrowUpDown className="ml-1.5 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[130px] px-3 py-3 text-xs text-slate-700 font-semibold">FOB Price</TableHead>
                  <TableHead className="w-[110px] px-3 py-3 text-xs text-slate-700 font-semibold text-right">
                    Quantity
                  </TableHead>
                  <TableHead className="w-[120px] px-3 py-3 text-xs text-slate-700 font-semibold text-right">
                    Created Date
                  </TableHead>
                  <TableHead className="w-[60px] px-3 py-3 text-xs text-slate-700 font-semibold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <TableRow
                      key={product.id}
                      data-state={selectedProducts.has(product.id) ? "selected" : ""}
                      className={cn(
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/80",
                        "hover:bg-orange-100/60 transition-colors",
                      )}
                    >
                      <TableCell className="px-3 py-2.5">
                        <Checkbox
                          checked={selectedProducts.has(product.id)}
                          onCheckedChange={(checked) => handleSelectProduct(product.id, !!checked)}
                          aria-label={`Select row ${product.id}`}
                        />
                      </TableCell>
                      <TableCell className="px-3 py-2.5">
                        <img
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          className="h-10 w-10 rounded object-cover border"
                        />
                      </TableCell>
                      <TableCell className="px-3 py-2.5 align-top">
                        <div className="font-medium text-sm text-foreground hover:text-primary transition-colors">
                          <Link href={`/products/${product.id}`}>{product.name}</Link>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-0.5 mt-1">
                          <p>
                            Condition: <span className="font-medium text-slate-700">{product.condition}</span>
                          </p>
                          <p>
                            SKU: <span className="font-medium text-slate-700">{product.sku}</span>
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2.5 align-top">
                        {editingPriceProductId === product.id ? (
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-muted-foreground mr-0.5">$</span>
                            <Input
                              type="number"
                              value={currentEditPrice}
                              onChange={(e) => setCurrentEditPrice(e.target.value)}
                              className="h-8 w-20 text-sm px-2"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleAttemptSavePrice()
                                if (e.key === "Escape") handleCancelEditPrice()
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-green-600 hover:bg-green-100"
                              onClick={handleAttemptSavePrice}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-600 hover:bg-red-100"
                              onClick={handleCancelEditPrice}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-start gap-2">
                            <span className="font-medium text-sm text-foreground">
                              ${product.sellingPrice.toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-primary opacity-50 hover:opacity-100"
                              onClick={() => handleEditPriceClick(product)}
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="px-3 py-2.5 align-top text-right">
                        {editingQuantityProductId === product.id ? (
                          <div className="flex items-center justify-end gap-1">
                            <Input
                              type="number"
                              value={currentEditQuantity}
                              onChange={(e) => setCurrentEditQuantity(e.target.value)}
                              className="h-8 w-16 text-sm px-2 text-right"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleAttemptSaveQuantity()
                                if (e.key === "Escape") handleCancelEditQuantity()
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-green-600 hover:bg-green-100"
                              onClick={handleAttemptSaveQuantity}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-600 hover:bg-red-100"
                              onClick={handleCancelEditQuantity}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end">
                            <span className="font-medium text-sm text-foreground">{product.quantity}</span>
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 ml-1 text-muted-foreground hover:text-primary"
                                    onClick={() => handleEditQuantityClick(product)}
                                  >
                                    <Edit3 className="h-3.5 w-3.5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent className="text-xs p-1.5">Edit Quantity</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="px-3 py-2.5 align-top text-right text-sm text-muted-foreground">
                        {formatDate(product.createdDate)}
                      </TableCell>
                      <TableCell className="px-3 py-2.5 align-top text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="text-xs">
                            <DropdownMenuItem>Edit Product</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 hover:!text-red-600 hover:!bg-red-50"
                              onClick={() => handleDeleteProductClick(product)}
                            >
                              Delete Product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <BulkUploadModal isOpen={isBulkUploadModalOpen} onOpenChange={setIsBulkUploadModalOpen} />

      {productForPriceConfirmation && newPriceForConfirmation !== null && (
        <AlertDialog open={showPriceConfirmDialog} onOpenChange={setShowPriceConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Price Change</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to change the FOB Price for
                <span className="font-semibold"> {productForPriceConfirmation.name} </span>
                from
                <span className="font-semibold"> ${productForPriceConfirmation.sellingPrice.toFixed(2)} </span>
                to
                <span className="font-semibold"> ${newPriceForConfirmation.toFixed(2)}</span>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setShowPriceConfirmDialog(false)
                  setProductForPriceConfirmation(null)
                  setNewPriceForConfirmation(null)
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmPriceChange}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {productForQuantityConfirmation && newQuantityForConfirmation !== null && (
        <AlertDialog open={showQuantityConfirmDialog} onOpenChange={setShowQuantityConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Quantity Change</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to change the Quantity for
                <span className="font-semibold"> {productForQuantityConfirmation.name} </span>
                from
                <span className="font-semibold"> {productForQuantityConfirmation.quantity} </span>
                to
                <span className="font-semibold"> {newQuantityForConfirmation}</span>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setShowQuantityConfirmDialog(false)
                  setProductForQuantityConfirmation(null)
                  setNewQuantityForConfirmation(null)
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmQuantityChange}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {productForDeletion && (
        <AlertDialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the product:
                <span className="font-semibold"> {productForDeletion.name}</span>? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setShowDeleteConfirmDialog(false)
                  setProductForDeletion(null)
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
