import { Route, Routes, useLocation } from 'react-router-dom'
import { Error404 } from "./containers/errors/Error404"
import { Home } from "./containers/pages/Home"
import { Casos } from "./containers/pages/Casos"
import { CasesEcommerce } from "./components/cases/ecommerce/CasesEcommerce"
import { Servicios } from "./containers/pages/Servicios"
import { Carreras } from "./containers/pages/Carreras"
import { Blog } from "./containers/pages/Blog"
import { PostDetail } from "./containers/pages/PostDetail"
import { Search } from "./containers/pages/Search"
import { Category } from "./containers/pages/Category"
import { Contacto } from "./containers/pages/Contacto"
import { Nosotros } from "./containers/pages/Nosotros"
import { TermsOfServices } from "./containers/pages/TermsOfServices"
import { PrivacyPolicy } from "./containers/pages/PrivacyPolicy"
import { Optin } from "./containers/pages/Optin"
import { OptInCTA } from './containers/pages/OptInCTA'
import { JavascriptDev } from './containers/pages/services/developmet/JavascriptDev'
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
            <Route path="/casos/ecommerce" element={<CasesEcommerce />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/servicios/javascript" element={<JavascriptDev />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/carreras" element={<Carreras />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<PostDetail />} />
            <Route path="/blog/search" element={<Search />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/terms" element={<TermsOfServices />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/ebook" element={<Optin />} />
            <Route path="/ebook/training" element={<OptInCTA />} />
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
