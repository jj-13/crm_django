import { useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Footer } from "../../components/navigation/Footer"
import { Navbar } from "../../components/navigation/Navbar"
import { Layout } from "../../hocs/layouts/Layout"
import { blogSearchPages } from "../../Store/BlogsSearchPageSlice"


function getBlogsSearch(){
  let blogsSearch = localStorage.getItem('blogs_search_pages')
  //console.log('search')  
  if(blogsSearch){
    blogsSearch = JSON.parse(blogsSearch)
    //console.log(blogsSearch)
    //console.log(blogsSearch.data[0].description)
  }
  else{
    blogsSearch = null
  }
  return blogsSearch
}

export const Search = () => {
  const dispatch = useDispatch()
  const [blogsSearch, setblogsSearch] = useState(getBlogsSearch())
  const location = useLocation();
  const searchParam = location.state.s
  console.log('Search Parametro: ' + searchParam)
  
  useEffect(()=>{
    window.scrollTo(0,0)

    dispatch(blogSearchPages(searchParam))
   
  },[dispatch, searchParam])

  
  return (
    <Layout>
        <Navbar />
        <div className="pt-28">                                 
            {
              blogsSearch.data.map((search)=>(search.id))
            }
        </div>            
        <Footer />
    </Layout>
  )
}
