import { Navigate, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import SmoothScroll from './components/SmoothScroll'
import PageTransition from './components/PageTransition'
import PageShell from './components/PageShell'
import Studio from './components/Studio'
import Philosophy from './components/Philosophy'
import Contact from './components/Contact'
import Home from './pages/Home'
import CollectionPage from './pages/CollectionPage'

export default function App() {
  return (
    <PageTransition>
      <SmoothScroll />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dream-collection" element={<CollectionPage variant="dream" />} />
        <Route path="/signature-collection" element={<CollectionPage variant="signature" />} />
        <Route
          path="/studio"
          element={
            <PageShell className="bg-ivory">
              <Studio />
            </PageShell>
          }
        />
        <Route
          path="/philosophy"
          element={
            <PageShell className="bg-bone">
              <Philosophy />
            </PageShell>
          }
        />
        <Route
          path="/contact"
          element={
            <PageShell className="bg-ink">
              <Contact />
            </PageShell>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageTransition>
  )
}
