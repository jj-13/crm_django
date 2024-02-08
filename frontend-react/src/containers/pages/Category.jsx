import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Footer } from "../../components/navigation/Footer"
import { Navbar } from "../../components/navigation/Navbar"
import { CategoriesHeader } from "../../components/blog/CategoriesHeader"
import { Layout } from "../../hocs/layouts/Layout"
import { category } from "../../Store/CategoriesSlice"
import { blogsByCategory } from "../../Store/BlogByCategorySlice"
import { blogsByCategoryPage } from "../../Store/BlogsByCategoryPageSlice"


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


export const Category = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState(getCategories())
  const [blogsByCategories, setBlogsByCategories] = useState(getBlogsByCategory())
  const params = useParams()
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
  
    dispatch(blogsByCategory(slug))
 
   
  },[dispatch])

  function getBlogsByCategoryPage(){    
    const result = getParams(blogsByCategories.next)
    dispatch(blogsByCategoryPage(result))  
  }
  
  return (
    <Layout>
        <Navbar />
        <div className="pt-28">
            <CategoriesHeader categories={categories.data}/>
            {
              blogsByCategories.next ? <button onClick={()=>getBlogsByCategoryPage()}>Next</button> : <Link to={blogsByCategories.previous}>Previous</Link>
            }
        </div>            
        <Footer />
    </Layout>
  )
}
