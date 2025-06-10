"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadCloud, Edit, Search, Loader2 } from "lucide-react"
import { fetchProductsFromSPAPI, type SPProduct } from "@/lib/mock-sp-api"
import { ProductSelectionModal } from "./product-selection-modal"
import { useToast } from "@/hooks/use-toast"
import { BulkUploadModal } from "./bulk-upload-modal"
import { useRouter } from "next/navigation"

export function ProductBatchEntryForm() {
  const [condition, setCondition] = useState("new")
  const [quantity, setQuantity] = useState("1")
  const [skuInput, setSkuInput] = useState("")
  const [itemIdNameInput, setItemIdNameInput] = useState("")
  const [searchType, setSearchType] = useState("title")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalProducts, setModalProducts] = useState<SPProduct[]>([])
  const [isLoadingApi, setIsLoadingApi] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const handleFindItem = async () => {
    if (!itemIdNameInput.trim()) {
      toast({
        title: "Search query empty",
        description: "Please enter an Item ID or Name to search.",
        variant: "destructive",
      })
      return
    }
    setIsLoadingApi(true)
    setApiError(null)
    try {
      const products = await fetchProductsFromSPAPI(itemIdNameInput, searchType)
      setModalProducts(products)
      setIsModalOpen(true)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
      setApiError(errorMessage)
      toast({
        title: "API Error",
        description: errorMessage,
        variant: "destructive",
      })
      setModalProducts([]) // Ensure modal doesn't show old data on error
      setIsModalOpen(true) // Open modal to show error message
    } finally {
      setIsLoadingApi(false)
    }
  }

  const handleProductSelected = (product: SPProduct) => {
    console.log("Product selected from modal:", product)
    console.log("Current form values:", {
      condition,
      quantity,
      sku: skuInput,
      originalSearch: itemIdNameInput,
      searchType,
    })
    toast({
      title: "Product Selected",
      description: `${product.title} (ASIN: ${product.asin}) selected.`,
    })
    // Here you would typically add the product to a batch list,
    // or populate more fields in the form based on the selected product.
    // For now, we just log it.
    // Optionally, clear itemIdNameInput or other fields after selection:
    // setItemIdNameInput("");
  }

  return (
    <>
      <Card className="shadow-md">
        <CardHeader className="pb-4 pt-5 px-6">{/* Card Header content if any, or remove if not needed */}</CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="condition" className="text-xs font-medium text-muted-foreground">
                Condition
              </Label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger id="condition" className="mt-1 h-9 text-sm">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used-like-new">Used - Like New</SelectItem>
                  <SelectItem value="used-good">Used - Good</SelectItem>
                  <SelectItem value="used-acceptable">Used - Acceptable</SelectItem>
                  <SelectItem value="for-parts">For Parts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity" className="text-xs font-medium text-muted-foreground">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-1 h-9 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="sku" className="text-xs font-medium text-muted-foreground">
                SKU (Optional)
              </Label>
              <Input
                id="sku"
                placeholder="Enter product SKU"
                value={skuInput}
                onChange={(e) => setSkuInput(e.target.value)}
                className="mt-1 h-9 text-sm"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="item-id-name" className="text-xs font-medium text-muted-foreground">
              Item ID or Name
            </Label>
            <div className="flex items-center gap-2 mt-1">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-auto min-w-[130px] h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Product Title</SelectItem>
                  <SelectItem value="asin">ASIN</SelectItem>
                  <SelectItem value="upc_ean">UPC/EAN</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="item-id-name"
                placeholder="Scan or type item identifier"
                value={itemIdNameInput}
                onChange={(e) => setItemIdNameInput(e.target.value)}
                className="flex-1 h-9 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-9 bg-white text-sm" onClick={() => router.push("/products/new")}>
                <Edit className="mr-1.5 h-3.5 w-3.5" />
                Manual Entry
              </Button>
              <Button variant="outline" className="h-9 bg-white text-sm" onClick={() => setIsBulkUploadModalOpen(true)}>
                <UploadCloud className="mr-1.5 h-3.5 w-3.5" />
                Bulk Upload
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-sm"
                onClick={handleFindItem}
                disabled={isLoadingApi}
              >
                {isLoadingApi ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Search className="mr-1.5 h-3.5 w-3.5" />
                )}
                Find Item & Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductSelectionModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        products={modalProducts}
        isLoading={isLoadingApi}
        error={apiError}
        onProductSelect={handleProductSelected}
        searchQuery={itemIdNameInput}
      />
      <BulkUploadModal isOpen={isBulkUploadModalOpen} onOpenChange={setIsBulkUploadModalOpen} />
    </>
  )
}
