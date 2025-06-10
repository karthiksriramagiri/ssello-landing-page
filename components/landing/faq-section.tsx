import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is NocNoc?",
    answer:
      "NocNoc is a cross-border e-commerce platform that enables sellers from around the world to easily sell their products in multiple marketplaces across Latin America. We handle logistics, payments, customer service, and more.",
  },
  {
    question: "Which marketplaces can I sell on through NocNoc?",
    answer:
      "You can sell on over 15 major marketplaces in countries like Brazil, Mexico, Argentina, Colombia, Chile, and more. This includes giants like Mercado Livre, Amazon, Walmart, and Coppel.",
  },
  {
    question: "How does NocNoc handle international shipping and customs?",
    answer:
      "NocNoc provides an end-to-end logistics solution. This includes picking up products from your warehouse, managing international freight, customs clearance in Latin American countries, and last-mile delivery to the end customer.",
  },
  {
    question: "How do I get paid?",
    answer:
      "NocNoc simplifies international payments. You will receive your earnings in your local currency (e.g., USD, EUR) directly to your bank account, after deducting applicable fees and commissions.",
  },
  {
    question: "What are the fees for selling on NocNoc?",
    answer:
      "Fees typically include a commission on sales and costs for logistics services. Specific fee structures can vary based on product category and services used. Please contact our sales team for a detailed proposal.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-slate-600">
            Find answers to common questions about selling with NocNoc.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pt-1 pb-4 text-sm">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
