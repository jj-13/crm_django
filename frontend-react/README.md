# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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


import { Provider } from 'react-redux'
import store from './Store'
import { Route, Routes, useLocation, BrowserRouter as Router } from 'react-router-dom'
import { Error404 } from "./containers/errors/Error404"
import { Home } from "./containers/pages/Home"
import { Casos } from "./containers/pages/Casos"
import { Servicios } from "./containers/pages/Servicios"
import { Carreras } from "./containers/pages/Carreras"
import { Blog } from "./containers/pages/Blog"
import { Contacto } from "./containers/pages/Contacto"
import { Nosotros } from "./containers/pages/Nosotros"

import { AnimatePresence } from 'framer-motion'

//import AnimatedRoutes from './Routes';
function App() { 

  return (
    <Provider store={store}>
      <Router>
        <RoutesWithLocation/>
      </Router>      
    </Provider>    
  )
}

function RoutesWithLocation() {
  const location = useLocation();
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
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App
