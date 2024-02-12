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

el siguiente codigo reactjs, al ejecutar el setBlogsDetail(getBlogsDetail()) no esta actualizando el valor de blogsDetail con el nuevo valor que esta en el localStorage

function getBlogsDetail(){
  let local_blogsDetail = localStorage.getItem('blogs_detail')
  
  if(local_blogsDetail){
      local_blogsDetail = JSON.parse(local_blogsDetail)
    //console.log(blogsDetail)
  }
  else{
      local_blogsDetail = null
  }
  return local_blogsDetail
}

export const PostDetail = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const [blogsDetail, setBlogsDetail] = useState(getBlogsDetail())

    const slug = params.slug
   
    useEffect(()=>{
        window.scrollTo(0,0)
        dispatch(blogDetail(slug))
        setBlogsDetail(getBlogsDetail())       
        
    }, [dispatch, slug])
  
    return (
        <Layout>
            <Navbar/>
            <div className="pt-28">
            {
                blogsDetail.data[0].slug
            }               
            </div>            
            <Footer/>
        </Layout>
    )
}
