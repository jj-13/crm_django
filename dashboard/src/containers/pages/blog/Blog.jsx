import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {Layout} from '../../../hocks/layouts/Layout'
import { category } from "../../../Store/CategoriesSlice"
import { BlogList } from "../../../components/blog/BlogList"
import { authorBlogPages, authorBlogCreate } from "../../../Store/Blog"
import { selecAuthorBlogs } from "../../../Store/Selector"

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

function getAcces(){
  let access = localStorage.getItem('login')
  
  if(access){
    access = JSON.parse(access)
    //console.log(blogs)
  }
  else{
    access = null
  }
  return access
}

export const Blog = () => {
  const dispatch = useDispatch()  
  const [access, setAccess] = useState(getAcces())
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState(getCategories())
  const authorBlogsPages = useSelector(selecAuthorBlogs)
  

  useEffect(()=>{

    dispatch(category())

    const fetchData = async () => {
      try{
        const body = {                              
          headers: {              
            'Content-Type': 'application/json', // Agrega el encabezado Content-Type  
            'Accept': 'application/json',  
            'Authorization': `JWT ${access.data[0].access}`
          },
          page: 1
        }    
        await dispatch(authorBlogPages(body))
      }
      catch (error){
        console.log("Error fetching author blogs details:", error)
      }
      finally{
        setLoading(false)
      }
    }

    fetchData()

  }, [dispatch, access.data])

  
  function list_page(page){

    const body = {                              
      headers: {              
        'Content-Type': 'application/json', // Agrega el encabezado Content-Type  
        'Accept': 'application/json',  
        'Authorization': `JWT ${access.data[0].access}`
      },
      page: page
    }  
   
    const fetchData = async () => {
      try{
        await dispatch(authorBlogPages(body))
      }
      catch (error){
        console.log("Error fetching blog details:", error)
      }
      finally{
        setLoading(false)
      }
    }

    fetchData()
  }

  function createBlog() {
    const fetchData = async () => {

        const body = {                        
            headers: {                                    
                'Accept': 'application/json',  
                'Content-Type': 'multipart/form-data', // Agrega el encabezado Content-Type: application/json 
                'Authorization': `JWT ${access.data[0].access}`
            }, 
            params:{
                user: authorBlogsPages.email
            }
        }   

        try{
            await dispatch(authorBlogCreate(body))
            authorBlogsPages

        }
        catch (error){
            setLoading(false)
            console.log("Error fetching Create data:", error)
        }
        finally{
            //setLoading(false)
        }

    }

    fetchData()
}

  return (
    <Layout>
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <h3 className="text-3xl font-medium leading-6 text-gray-900">Blog</h3>
                <p className="mt-3 text-lg text-gray-500">
                    Create or edit a blog post.
                </p>
                </div>
                <div className="ml-4 mt-4 flex-shrink-0">
                <button
                    onClick={()=>{
                      createBlog()
                        /*const config = {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `JWT ${access.data[0].access}`
                            }
                        };

                        const body = JSON.stringify({

                        })

                        const fetchData = async()=>{
                            try{
                                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/create`,body,config)
                            
                                if(res.status === 200){
                                    get_author_blog_list()
                                }
                            }catch(err){
                                alert('Error al crear post')
                            }
                        }
                        fetchData()*/
                    }}
                    className="relative inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    Create Post
                </button>
              </div>
            </div>
          </div>
      <BlogList 
        posts={authorBlogsPages&&authorBlogsPages}
        get_blog_list_page={list_page}
        count={authorBlogsPages&&authorBlogsPages&&authorBlogsPages.count&&authorBlogsPages.count}
      />
    </Layout>
  )
}
