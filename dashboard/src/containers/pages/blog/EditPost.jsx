import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {Layout} from '../../../hocks/layouts/Layout'
import { category } from "../../../Store/CategoriesSlice"
import { BlogList } from "../../../components/blog/BlogList"
import { authorBlogPages } from "../../../Store/Blog"
import { blogDetail } from "../../../Store/BlogsDetailSlice"
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { selecAuthorBlogs, selecAuthorBlogsDetail } from "../../../Store/Selector"

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

export const EditPost = () => {
  const dispatch = useDispatch()  
  const [access, setAccess] = useState(getAcces())
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState(getCategories())
  const authorBlogsPages = useSelector(selecAuthorBlogs)
  const authorBlogsDeatil = useSelector(selecAuthorBlogsDetail)

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const {register, handleSubmit, 
    formState:{errors}, watch, setValue, reset} = useForm()

  const params = useParams()
  const slug = params.slug
  

  useEffect(()=>{
    window.scrollTo(0,0)
    const fetchData = async () => {
        try {
            await dispatch(blogDetail(slug))
        } catch (error) {
            console.error("Error fetching blog details:", error);
        } finally {
            // Set loading to false after the fetch operation completes
            setLoading(false);
        }
    };

    fetchData();

  }, [dispatch, slug])

  const [updateTitle, setUpdateTitle]=useState(false)
const [updateSlug, setUpdateSlug]=useState(false)
const [updateDescription, setUpdateDescription]=useState(false)
const [updateContent, setUpdateContent]=useState(false)
const [updateCategory, setUpdateCategory]=useState(false)
const [updateThumbnail, setUpdateThumbnail]=useState(false)
const [updateTime, setUpdateTime]=useState(false)
const [content, setContent]=useState('')

const onSubmit = handleSubmit( (data) => {
    console.log(data.title)   
})


  return (
    <Layout>

        {
            authorBlogsDeatil&&authorBlogsDeatil ? 
            <>

                <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                    <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                        <div className="ml-4 mt-4">
                            <h3 className="text-3xl font-medium leading-6 text-gray-900">Edit Post</h3>
                            <p className="mt-3 text-lg text-gray-500">
                                {authorBlogsDeatil.title}
                            </p>
                            </div>
                            <div className="ml-4 mt-4 flex-shrink-0">
                            <button
                                onClick={()=>{
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
                                className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                            >
                                Delete
                            </button>
                            <button
                                onClick={()=>{
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
                                className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                View Post
                            </button>
                            <button
                                onClick={()=>{
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
                                className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
                
                {/******************************************************************************************************/}
                

                <div className="mt-5 border-t border-gray-200">
                    <dl className="divide-y divide-gray-200">

                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">Title</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateTitle ?
                                    <>
                                        <form onSubmit={onSubmit} className="flex w-full">

                                            <span className="flex-grow">
                                                <input                                                
                                                name='title'
                                                type='text'
                                                className="border border-gray-400 rounded-lg w-full"
                                                {...register('title', {
                                                    required: {
                                                        value: true,
                                                        message: "es requerido"
                                                        }
                                                    })
                                                }
                                                />
                                            </span>
                                            <span className="ml-4 flex-shrink-0">
                                                <button
                                                type="submit"
                                                className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                Save
                                                </button>
                                                <div
                                                onClick={()=>setUpdateTitle(false)}
                                                className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                Cancel
                                                </div>
                                            </span>
                                        </form>
                                    </>:
                                    <>
                                        <span className="flex-grow">{authorBlogsDeatil.title}</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                            onClick={()=>setUpdateTitle(true)}
                                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                            Update
                                            </button>
                                        </span>
                                    </>

                                }
                            
                            </dd>
                        </div>

                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Application for</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">Backend Developer</span>
                        <span className="ml-4 flex-shrink-0">
                            <button
                            onClick={()=>setUpdateTitle(true)}
                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                            Update
                            </button>
                        </span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">margotfoster@example.com</span>
                        <span className="ml-4 flex-shrink-0">
                            <button
                            type="button"
                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                            Update
                            </button>
                        </span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">$120,000</span>
                        <span className="ml-4 flex-shrink-0">
                            <button
                            type="button"
                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                            Update
                            </button>
                        </span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">About</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <span className="flex-grow">
                            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                            qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure
                            nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                        </span>
                        <span className="ml-4 flex-shrink-0">
                            <button
                            type="button"
                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                            Update
                            </button>
                        </span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span className="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                            </div>
                            <div className="ml-4 flex flex-shrink-0 space-x-4">
                                <button
                                type="button"
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                Update
                                </button>
                                <span className="text-gray-300" aria-hidden="true">
                                |
                                </span>
                                <button
                                type="button"
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                Remove
                                </button>
                            </div>
                            </li>
                            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span className="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                            </div>
                            <div className="ml-4 flex flex-shrink-0 space-x-4">
                                <button
                                type="button"
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                Update
                                </button>
                                <span className="text-gray-300" aria-hidden="true">
                                |
                                </span>
                                <button
                                type="button"
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                Remove
                                </button>
                            </div>
                            </li>
                        </ul>
                        </dd>
                    </div>
                    </dl>
                </div>
                {/******************************************************************************************************/}
            </>
            :
            <>Lading...</>
        }
          
    </Layout>
  )
}
