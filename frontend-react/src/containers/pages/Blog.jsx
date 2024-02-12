import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Footer } from "../../components/navigation/Footer"
import { Navbar } from "../../components/navigation/Navbar"
import { CategoriesHeader } from "../../components/blog/CategoriesHeader"
import { Layout } from "../../hocs/layouts/Layout"
import { category } from "../../Store/CategoriesSlice"
import { blog } from "../../Store/BlogSlice"
import { blogPages } from "../../Store/BlogPagesSlice"
import { BlogList } from "../../components/blog/BlogList"
import { blogsByCategory } from "../../Store/BlogByCategorySlice"
import { blogsByCategoryPage } from "../../Store/BlogsByCategoryPageSlice"
import { blogDetail } from "../../Store/BlogsDetailSlice"
import { blogSearchPages } from "../../Store/BlogsSearchPageSlice"

function getParams(url) {
  const myUrl = new URL(url);
  const params = new URLSearchParams(myUrl.search);
  const category_slug = params.get('category_slug');
  const page = params.get('p');
  return { category_slug, page };
}

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

function getBlogs(){
  let blogs = localStorage.getItem('blogs')
  
  if(blogs){
    blogs = JSON.parse(blogs)
    //console.log(blogs)
  }
  else{
    blogs = null
  }
  return blogs
}
function getBlogsPages(){
  let blogsPages = localStorage.getItem('blogs_pages')
  
  if(blogsPages){
    blogsPages = JSON.parse(blogsPages)
    //console.log(blogsPages)
  }
  else{
    blogsPages = null
  }
  return blogsPages
}

function getBlogsDetail(){
  let blogsDetail = localStorage.getItem('blogs_detail')
  
  if(blogsDetail){
    blogsDetail = JSON.parse(blogsDetail)
    //console.log(blogsDetail)
  }
  else{
    blogsDetail = null
  }
  return blogsDetail
}

function getBlogsByCategory(){
  let blogsByCategory = localStorage.getItem('blogs_by_categories')
  
  if(blogsByCategory){
    blogsByCategory = JSON.parse(blogsByCategory)
    //console.log(blogsByCategory)
  }
  else{
    blogsByCategory = null
  }
  return blogsByCategory
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

export const Blog = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState(getCategories())
  const [blogs, setBlogs] = useState(getBlogs())
  const [blogsPages, seblogsPages] = useState(getBlogsPages())
  const [blogsByCategories, setBlogsByCategories] = useState(getBlogsByCategory())
  const [blogsDetail, setBlogsDetail] = useState(getBlogsDetail())
  const [blogsSearch, setblogsSearch] = useState(getBlogsSearch())
    
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
    dispatch(blog())
    dispatch(blogPages(1))
    dispatch(blogsByCategory('software'))
    //dispatch(blogDetail('code-django'))
    //dispatch(blogSearchPages('python'))
   
  },[dispatch, blogsPages])

  function getBlogsByCategoryPage(){    
    const result = getParams(blogsByCategories.next)
    dispatch(blogsByCategoryPage(result))  
  }

  function list_page(page){
    dispatch(blogPages(page)).then((result) =>{
      //console.log('actualizando post!!!')
      //console.log(rows)
      if (result.payload){
          console.log(result.payload.data)
          let updateBlogsPages = localStorage.getItem('blogs_pages')
          let dataUpdate = JSON.parse(updateBlogsPages)
          dataUpdate.rows = [...result.payload.data]
          localStorage.setItem('blogs_pages', JSON.stringify(dataUpdate))
          seblogsPages(getBlogsPages())

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
            <CategoriesHeader categories={categories.data}/>
            <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
              {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
              <div className="mx-auto max-w-7xl my-10">
                <BlogList 
                  posts={blogsPages}
                  get_blog_list_page={list_page}
                  count={blogsPages.count}
                />
              </div>
            </div> 
            Total Post: {blogsPages.count} 
            {
              blogs.next ? <Link to={blogs.next}>Next</Link> : <Link to={blogs.previous}>Previous</Link>
            }
            {
              blogsByCategories.next ? <button onClick={()=>getBlogsByCategoryPage()}>Next</button> : <Link to={blogsByCategories.previous}>Previous</Link>
            }
            {
              blogsDetail.data.map((detail)=>(detail.id))
            }
            {/*
              blogsSearch.data.map((search)=>(search.description))
          */}
        </div>            
        <Footer />
    </Layout>
  )
}
