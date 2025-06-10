export function StatsSection() {
  const stats = [
    { value: "15+", label: "Marketplaces Integrated" },
    { value: "700M+", label: "Potential Customers" },
    { value: "48hr", label: "Average Listing Time" },
    { value: "24/7", label: "Dedicated Support" },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-lg ">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-base lg:text-lg text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
