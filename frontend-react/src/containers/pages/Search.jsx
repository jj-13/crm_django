import { useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Footer } from "../../components/navigation/Footer"
import { Navbar } from "../../components/navigation/Navbar"
import { BlogList } from "../../components/blog/search/BlogList"
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
  const page = 1
  const params = {searchParam, page}
  dispatch(blogSearchPages(params))
  
  useEffect(()=>{
    window.scrollTo(0,0)
    // const page = 1
    // const searchParam = 'test'
    // const params = {searchParam, page}
    // dispatch(blogSearchPages(params))
   
  }, [])

  function list_page(page){
    dispatch(blogSearchPages(page)).then((result) =>{
      //console.log('actualizando post!!!')
      //console.log(rows)
      if (result.payload){
          console.log(result.payload.data)
          let updateBlogsPages = localStorage.getItem('blogs_search_pages')
          let dataUpdate = JSON.parse(updateBlogsPages)
          dataUpdate.rows = [...result.payload.data]
          localStorage.setItem('blogs_search_pages', JSON.stringify(dataUpdate))
          setblogsSearch(getBlogsSearch())

          //localStorage.setItem('blogs', JSON.stringify([result.payload.data]))
          //setBlogs([result.payload.data])
          // console.log(result.payload.columns)
          // console.log(result.payload.data)
          //console.log("")
      }
    }) 
  }

  
  return (
    <Layout>
        <Navbar />
        <div className="pt-28">    
          <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="mx-auto max-w-full my-10">
              {/* Content goes here */}
              <BlogList posts={blogsSearch} get_blog_list_page={list_page} term={searchParam} count={blogsSearch.count}/>
            </div>
          </div>                         
            {
              blogsSearch.data.map((search)=>(search.id))
            }
        </div>            
        <Footer />
    </Layout>
  )
}
