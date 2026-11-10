import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { images, preloadImage } from './data/images'
import './index.css'

const ROUTE_HEROES = {
  '/': images.hero,
  '/dream-collection': images.dream,
  '/signature-collection': images.signature,
  '/studio': images.studio,
  '/philosophy': images.philosophy,
  '/contact': images.contact,
}

preloadImage(ROUTE_HEROES[window.location.pathname] ?? images.hero, { priority: true })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
