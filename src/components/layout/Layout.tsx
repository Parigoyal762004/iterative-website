import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { SmoothScroll } from './SmoothScroll'
import WhatsAppFloat from '@/components/WhatsAppFloat'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
