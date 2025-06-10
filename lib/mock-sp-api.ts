export interface SPProduct {
  id: string
  asin: string
  title: string
  imageUrl: string
  price?: number
  category?: string
  brand?: string
  upc?: string
}

export async function fetchProductsFromSPAPI(query: string, searchType: string): Promise<SPProduct[]> {
  console.log(`Simulating SP-API call for ${searchType}: ${query}`)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (query.toLowerCase().includes("error")) {
        reject(new Error("Simulated API error: Failed to fetch products."))
        return
      }

      const allProducts: SPProduct[] = [
        {
          id: "B08N5WRWNW",
          asin: "B08N5WRWNW",
          title: "Echo Dot (4th Gen) - Smart speaker with Alexa",
          imageUrl: "/placeholder.svg?height=80&width=80",
          price: 49.99,
          category: "Electronics",
          brand: "Amazon",
          upc: "039442030320",
        },
        {
          id: "B07NFTVP7P",
          asin: "B07NFTVP7P",
          title: 'Kindle Paperwhite (8 GB) – Now with a 6.8" display',
          imageUrl: "/placeholder.svg?height=80&width=80",
          price: 139.99,
          category: "Electronics",
          brand: "Amazon",
          upc: "850060518294",
        },
        {
          id: "B08P3QVFMK",
          asin: "B08P3QVFMK",
          title: "Fire TV Stick 4K streaming device with Alexa Voice Remote",
          imageUrl: "/placeholder.svg?height=80&width=80",
          price: 39.99,
          category: "Electronics",
          brand: "Amazon",
          upc: "840080587425",
        },
        {
          id: "B09B2SBHQK",
          asin: "B09B2SBHQK",
          title: "Apple AirPods (3rd Generation) Wireless Earbuds",
          imageUrl: "/placeholder.svg?height=80&width=80",
          price: 169.0,
          category: "Electronics",
          brand: "Apple",
          upc: "194252683441",
        },
        {
          id: "B08J65R325",
          asin: "B08J65R325",
          title: "Sony WH-1000XM4 Wireless Noise Canceling Headphones",
          imageUrl: "/placeholder.svg?height=80&width=80",
          price: 348.0,
          category: "Electronics",
          brand: "Sony",
          upc: "027242924211",
        },
        {
          id: "SKU123PROD",
          asin: "B0EXAMPLE1",
          title: "Specific SKU Matched Product - Premium Quality Widget",
          imageUrl: "/placeholder.svg?height=80&width=80",
          price: 75.5,
          category: "Gadgets",
          brand: "WidgetCo",
          upc: "633472602283",
        },
      ]

      if (query.toLowerCase().includes("empty") || !query.trim()) {
        resolve([])
        return
      }

      let filteredProducts: SPProduct[]
      const lowerQuery = query.toLowerCase()

      if (searchType === "asin") {
        filteredProducts = allProducts.filter((p) => p.asin.toLowerCase() === lowerQuery)
      } else if (searchType === "upc_ean") {
        // Simulate UPC/EAN match, for now, let's use ASIN as a proxy or a specific title
        filteredProducts = allProducts.filter(
          (p) => p.asin.toLowerCase() === lowerQuery || p.title.toLowerCase().includes("upc matched"),
        )
      } else {
        // Default to title search
        filteredProducts = allProducts.filter(
          (p) => p.title.toLowerCase().includes(lowerQuery) || p.brand?.toLowerCase().includes(lowerQuery),
        )
      }

      resolve(filteredProducts)
    }, 1200) // Simulate network delay
  })
}
