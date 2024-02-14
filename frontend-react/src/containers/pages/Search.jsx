import { useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Footer } from "../../components/navigation/Footer"
import { Navbar } from "../../components/navigation/Navbar"
import { CategoriesHeader } from "../../components/blog/CategoriesHeader"
import { BlogList } from "../../components/blog/search/BlogList"
import { Layout } from "../../hocs/layouts/Layout"
import { blogSearchPages } from "../../Store/BlogsSearchPageSlice"


function getCategories(){
  let categories = localStorage.getItem('categories')
  
  if(categories){
    categories = JSON.parse(categories)
    //console.log(categories)
  }
  else{
    categories = null
  }
  return categories
}

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
  const [categories, setCategories] = useState(getCategories())
  const [blogsSearch, setblogsSearch] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation();
  const searchParam = location.state.s
  console.log('Search Parametro: ' + searchParam)
 
  
  useEffect(()=>{
    window.scrollTo(0,0)
    // const page = 1
    // const searchParam = 'test'
    // const params = {searchParam, page}
    // dispatch(blogSearchPages(params))
    const page = 1
    const params = {searchParam, page}
    const fetchData = async () => {
      try{
        await dispatch(blogSearchPages(params))
        setblogsSearch(getBlogsSearch())
      }
      catch (error){
        console.log('Error fetching data search blog: ', error)
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  }, [dispatch, searchParam])

  function list_page(page){   
    
    const params = {searchParam, page}

    //dispatch(blogSearchPages(params)) 
    const fetchData = async () => {
      try{
        await dispatch(blogSearchPages(params))
        setblogsSearch(getBlogsSearch())
      }
      catch (error){
        console.log('Error fetching data search blog: ', error)
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  }

  if (loading){
    return <>Loading...</>
  }

  
  return (
    <Layout>
        <Navbar />
        <div className="pt-28"> 
          <CategoriesHeader categories={categories.data}/> 
          <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="mx-auto max-w-full my-10">
              {/* Content goes here */}
              <BlogList 
                posts={blogsSearch&&blogsSearch} 
                get_blog_list_page={list_page} 
                term={searchParam} 
                count={blogsSearch.count&&blogsSearch.count}
              />
            </div>
          </div>                         
            
        </div>            
        <Footer />
    </Layout>
  )
}
