import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Footer } from "../../components/navigation/Footer"
import { Navbar } from "../../components/navigation/Navbar"
import { CategoriesHeader } from "../../components/blog/CategoriesHeader"
import { Layout } from "../../hocs/layouts/Layout"
import { category } from "../../Store/CategoriesSlice"
import { blogsByCategoryPage } from "../../Store/BlogsByCategoryPageSlice"
import { BlogList } from "../../components/blog/BlogList"


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
function getBlogsByCategoryPages(){
  let blogsByCategoryPages = localStorage.getItem('blogs_by_categories_pages')
  
  if(blogsByCategoryPages){
    blogsByCategoryPages = JSON.parse(blogsByCategoryPages)
    console.log(blogsByCategoryPages)
  }
  else{
    blogsByCategoryPages = null
  }
  return blogsByCategoryPages
}


export const Category = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState(getCategories())
  const [blogsByCategoriesPages, setBlogsByCategoriesPages] = useState(null)
  const slug = params.slug
  console.log('Parametro: ' + slug)    
  

  useEffect(()=>{
    window.scrollTo(0,0)
    dispatch(category()).then((result) =>{
      /* console.log('dispatch_categoryProduct')
      // console.log(columns)
      // console.log(rows)
      if (result.payload){
          //console.log(result.payload)
          setRows([...result.payload.data])
          // console.log(result.payload.columns)
          // console.log(result.payload.data)
          //console.log("")
      }*/
    }) 
    //const slug = getCategory()
    const page = 1
    const params1 = { slug, page }
    
    const fetchData = async () => {
      
      try{
        await dispatch(blogsByCategoryPage(params1))
        setBlogsByCategoriesPages(getBlogsByCategoryPages())
      }
      catch (error){
        console.error("Error fetching blog details:", error);
      }
      finally{
        setLoading(false)
      }      
    }
    fetchData()
   
  },[dispatch, slug])

  function list_page(page){
    const params1 = { slug, page }  
    /* console.log('actualizando post por categoria!!!')
      // console.log(rows)
      if (result.payload){
          console.log(result.payload.data)
          let updateBlogsPages = localStorage.getItem('blogs_by_categories_pages')
          let dataUpdate = JSON.parse(updateBlogsPages)
          dataUpdate.rows = [...result.payload.data]
          localStorage.setItem('blogs_by_categories_pages', JSON.stringify(dataUpdate))
          setBlogsByCategoriesPages(getBlogsByCategoryPages())

          //localStorage.setItem('blogs', JSON.stringify([result.payload.data]))
          //setBlogs([result.payload.data])
          // console.log(result.payload.columns)
          // console.log(result.payload.data)
          //console.log("")
      } */
    const fetchData = async () => {
      
      try{
        await dispatch(blogsByCategoryPage(params1))
        setBlogsByCategoriesPages(getBlogsByCategoryPages())
      }
      catch (error){
        console.error("Error fetching blog details:", error);
      }
      finally{
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
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                <div className="mx-auto max-w-6xl my-10">
                  {/* Content goes here */}
                  <BlogList 
                    posts={blogsByCategoriesPages&&blogsByCategoriesPages} 
                    get_blog_list_page={list_page} 
                    count={blogsByCategoriesPages.count&&blogsByCategoriesPages.count}
                  />
                </div>
            </div>
        </div>            
        <Footer />
    </Layout>
  )
}
