"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LandingFooter() {
  const { t } = useLanguage()
  
  const footerNavs = [
    {
      title: t.footer.product,
      items: [
        { label: t.nav.solutions, href: "/solutions" },
        { label: t.nav.marketplaces, href: "/marketplaces" },
        { label: t.nav.pricing, href: "/pricing" },
      ],
    },
    {
      title: t.footer.company,
      items: [
        { label: t.nav.about, href: "/about" },
        { label: t.nav.contact, href: "/contact" },
      ],
    },
    {
      title: t.footer.resources,
      items: [
        { label: t.nav.getStarted, href: "/signup" },
        { label: t.footer.support, href: "/contact" },
      ],
    },
  ]

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/ssello/" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/ssello_latam" },
    { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@Ssello_LATAM" },
    { name: "TikTok", icon: function TikTokIcon(props: any) { return <div {...props} className={`${props.className} text-center font-bold text-xs`}>TT</div> }, href: "https://www.tiktok.com/@ssello_latam?_t=ZP%3D8x0x2TVzAtz&_r=1" },
  ]

  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1 mb-8 md:mb-0">
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/logos/ssello-logo.png"
                alt="ssello Logo"
                width={140}
                height={56}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm max-w-xs leading-relaxed mb-6">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-orange-500 transition-colors duration-300 p-2 rounded-lg hover:bg-slate-800"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
          
          {footerNavs.map((nav) => (
            <div key={nav.title}>
              <h4 className="font-semibold text-white text-lg mb-4">{nav.title}</h4>
              <ul className="space-y-3">
                {nav.items.map((item) => (
                  <li key={item.label}>
                    <Link 
                      href={item.href} 
                      className="hover:text-orange-500 transition-colors text-sm duration-300 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ssello. {t.common.allRightsReserved}.
          </p>
          <div className="text-sm text-slate-500">
            {t.common.builtForLatam}
          </div>
        </div>
      </div>
    </footer>
  )
}
