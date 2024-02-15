import { Route, Routes, useLocation } from 'react-router-dom'
import { Error404 } from "../../containers/errors/Error404"
import { Home } from "../../containers/pages/Home"
import { Blog } from "../../containers/pages/blog/Blog";
import { Dashboard } from "../../containers/pages/Dashboard";
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
