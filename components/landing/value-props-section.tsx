import { Package, Globe, Users, DollarSign, BarChartBig, ShieldCheck } from "lucide-react"
import type React from "react"

interface ValueProp {
  icon: React.ElementType
  title: string
  description: string
}

const valueProps: ValueProp[] = [
  {
    icon: Package,
    title: "End-to-End Logistics",
    description: "We handle international shipping, customs clearance, and last-mile delivery to your customers.",
  },
  {
    icon: Globe,
    title: "Access 15+ Marketplaces",
    description: "One integration to list your products on major e-commerce platforms across Latin America.",
  },
  {
    icon: Users,
    title: "Localized Customer Support",
    description: "Multi-language customer service to assist your buyers in their native language.",
  },
  {
    icon: DollarSign,
    title: "Simplified Payments",
    description: "Receive your earnings in your local currency, hassle-free. We manage FX and payment processing.",
  },
  {
    icon: BarChartBig,
    title: "Marketing & Sales Boost",
    description: "Benefit from our marketing strategies and tools to increase your visibility and sales.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description: "Trust in our robust platform and expertise to manage your cross-border operations securely.",
  },
]

export function ValuePropsSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything You Need to Succeed Globally</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            ssello provides a comprehensive solution for sellers looking to expand into Latin America.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valueProps.map((prop) => (
            <div key={prop.title} className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <prop.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{prop.title}</h3>
              <p className="text-slate-600 text-sm">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
