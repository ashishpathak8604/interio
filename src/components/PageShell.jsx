import Navbar from './Navbar'
import Footer from './Footer'

export default function PageShell({ className = 'bg-ivory', children }) {
  return (
    <div className={`relative min-h-[100svh] ${className}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
