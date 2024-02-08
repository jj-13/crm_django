import { Route, Routes, useLocation } from 'react-router-dom'
import { Error404 } from "./containers/errors/Error404"
import { Home } from "./containers/pages/Home"
import { Casos } from "./containers/pages/Casos"
import { Servicios } from "./containers/pages/Servicios"
import { Carreras } from "./containers/pages/Carreras"
import { Blog } from "./containers/pages/Blog"
import { Search } from "./containers/pages/Search"
import { Category } from "./containers/pages/Category"
import { Contacto } from "./containers/pages/Contacto"
import { Nosotros } from "./containers/pages/Nosotros"

import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {
    const location = useLocation()

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            {/* Error Display */}
            <Route path="*" element={<Error404 />} />

            {/* Home Display */}
            <Route path="/" element={<Home />} />
            <Route path="/casos" element={<Casos />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/carreras" element={<Carreras />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/search" element={<Search />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/contacto" element={<Contacto />} />
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
