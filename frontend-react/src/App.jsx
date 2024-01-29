import { Error404 } from "./containers/errors/Error404"
import { Home } from "./containers/pages/Home"
import { Provider } from 'react-redux'
import store from './Store'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import { Casos } from "./containers/pages/Casos"
import { Servicios } from "./containers/pages/Servicios"
import { Carreras } from "./containers/pages/Carreras"
import { Blog } from "./containers/pages/Blog"
import { Contacto } from "./containers/pages/Contacto"
import { Nosotros } from "./containers/pages/Nosotros"
function App() { 

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Error404/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/casos" element={<Casos/>} />
          <Route path="/servicios" element={<Servicios/>} />
          <Route path="/nosotros" element={<Nosotros/>} />
          <Route path="/carreras" element={<Carreras/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/contacto" element={<Contacto/>} />
        </Routes>
      </Router>      
    </Provider>    
  )
}

export default App
