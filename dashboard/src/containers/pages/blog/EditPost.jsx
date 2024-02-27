import { useEffect, useState, Fragment } from 'react'
import { useForm } from "react-hook-form"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {Layout} from '../../../hocks/layouts/Layout'
import { category } from "../../../Store/CategoriesSlice"
import { BlogList } from "../../../components/blog/BlogList"
import { authorBlogPages } from "../../../Store/Blog"
import { blogDetail, blogUpdateDetail } from "../../../Store/BlogsDetailSlice"
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { selectUser, selectIsAuthenticated, selecAuthorBlogs, selecAuthorBlogsDetail } from "../../../Store/Selector"
import slugify from 'slugify'
import DOMPurify from 'dompurify'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Dialog, Transition } from '@headlessui/react'

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
  const navigate = useNavigate()
  const [access, setAccess] = useState(getAcces())
  const [loading, setLoading] = useState(true)
  const [showFullContent, setShowFullContent] = useState(false)
  const [categories, setCategories] = useState(getCategories())
  const authorBlogsPages = useSelector(selecAuthorBlogs)
  const authorBlogsDeatil = useSelector(selecAuthorBlogsDetail)
  const infoUserBlogsDeatil = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const [previewImage, setPreviewImage] = useState()
  const [thumbnail, setThumbnail] = useState(null)

  const {register, handleSubmit, trigger,
    formState:{errors}, watch, setValue, reset} = useForm()

  const params = useParams()
  const slug = params.slug
  

  useEffect(()=>{
    window.scrollTo(0,0)
    
    categories ? <></> : getCategories()

    const fetchData = async () => {
        try {
            await dispatch(blogDetail(slug))
        } catch (error) {
            console.error("Error fetching blog details:", error)
            setLoading(false)
            setUpdateTitle(false)
            setUpdateSlug(false)
            setUpdateDescription(false)
            setUpdateContent(false)
            setUpdateCategory(false)
            if(thumbnail){
                setThumbnail(null)
                setPreviewImage(null)
            }
            if(content){
                setContent('')
            }
        } finally {
            // Set loading to false after the fetch operation completes
            setLoading(false)
            setUpdateTitle(false)
            setUpdateSlug(false)
            setUpdateDescription(false)
            setUpdateContent(false)
            setUpdateCategory(false)
            if(thumbnail){
                setThumbnail(null)
                setPreviewImage(null)
            }
            if(content){
                setContent('')
            }
        }
    };

    fetchData();

  }, [categories, dispatch, slug])

 

  const [updateTitle, setUpdateTitle]=useState(false)
  const [updateSlug, setUpdateSlug]=useState(false)
  const [updateDescription, setUpdateDescription]=useState(false)
  const [updateContent, setUpdateContent]=useState(false)
  const [updateCategory, setUpdateCategory]=useState(false)
  const [updateThumbnail, setUpdateThumbnail]=useState(false)
const [updateTime, setUpdateTime]=useState(false)
  const [content, setContent]=useState('')

const resetStates = () => {
    setUpdateTitle(false)
    setUpdateSlug(false)
    setUpdateDescription(false)
    setUpdateContent(false)
    setUpdateCategory(false)
    setUpdateThumbnail(false)
    setUpdateTime(false)
}

const fileSelectedHandler = (e)=> {
    const file = e.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
        setPreviewImage(reader.result);
    };
    setThumbnail(file)
}

const onSubmitDraft = (e) => {
    e.preventDefault()
    const fetchData = async () => {

        const body = { 
            slug: slug,                         
            headers: {                                    
                'Accept': 'application/json',  
                'Content-Type': 'multipart/form-data', // Agrega el encabezado Content-Type
                'Authorization': `JWT ${access.data[0].access}`
            },
            params:{
                user: infoUserBlogsDeatil.email,
            }
        }   

        try{
            await dispatch(blogUpdateDetail(body))

        }
        catch (error){
            setLoading(false)
            console.log("Error fetching Login data:", error)
        }
        finally{
            //setLoading(false)
        }

    }

    fetchData()
}

const onSubmitPublish = (e) => {

    const fetchData = async () => {

        const body = { 
            slug: slug,                         
            headers: {                                    
                'Accept': 'application/json',  
                'Content-Type': 'multipart/form-data', // Agrega el encabezado Content-Type: application/json 
                'Authorization': `JWT ${access.data[0].access}`
            }, 
            params:{
                user: infoUserBlogsDeatil.email,
            }
        }   

        try{
            await dispatch(blogUpdateDetail(body))

        }
        catch (error){
            setLoading(false)
            console.log("Error fetching Login data:", error)
        }
        finally{
            //setLoading(false)
        }

    }

    fetchData()

}

const onSubmit = handleSubmit( (data) => {
    //console.log(data.title, infoUserBlogsDeatil.email)   
    //console.log(data.content)   
    console.log(data.category)   
    console.log('datos content',content)   
    const fetchData = async () => {
        try{          
            
            const body = { 
                slug: slug, 
                form: {
                    title: data.title,
                    new_slug: data.new_slug,
                    description: data.description,
                    //content: content,
                    content: data.content,
                    category: data.category,
                    thumbnail: thumbnail,

                },                            
                headers: {                                    
                    'Accept': 'application/json',  
                    'Content-Type': 'multipart/form-data', // Agrega el encabezado Content-Type
                    'Authorization': `JWT ${access.data[0].access}`
                }, 
                params:{
                    user: infoUserBlogsDeatil.email,
                }
            }   
          
            await dispatch(blogUpdateDetail(body))
            .then((result) =>{
                if (result.payload){     
                    setLoading(true)

                    const fetchData = async () => {
                        try {
                            // console.log('new slug')
                            // console.log(data.new_slug) //hacer el slugify                            

                           if(data.new_slug !== undefined){
                                
                                const strings = slugify(data.new_slug)
                                //console.log(strings)
                                await dispatch(blogDetail(strings))
                                navigate(-1)
                            }else{
                                await dispatch(blogDetail(slug))
                            } 
                            setLoading(false)
                            setUpdateTitle(false)
                            setUpdateSlug(false)
                            setUpdateDescription(false)
                            setUpdateContent(false)
                            setUpdateCategory(false)
                            if(thumbnail){
                                setThumbnail(null)
                                setPreviewImage(null)
                            }
                            if(content){
                                setContent('')
                            }
                            
                        } catch (error) {
                            setLoading(false)
                            setUpdateTitle(false)
                            setUpdateSlug(false)
                            setUpdateDescription(false)
                            setUpdateContent(false)
                            setUpdateCategory(false)
                            setUpdateThumbnail(false)
                            if(thumbnail){
                                setThumbnail(null)
                                setPreviewImage(null)
                            }
                            if(content){
                                setContent('')
                            }
                            console.error("Error fetching blog details:", error)
                        } finally {
                            // Set loading to false after the fetch operation completes
                            setLoading(false)
                            setUpdateTitle(false)
                            setUpdateSlug(false)
                            setUpdateDescription(false)
                            setUpdateContent(false)
                            setUpdateCategory(false)
                            setUpdateThumbnail(false)
                            if(thumbnail){
                                setThumbnail(null)
                                setPreviewImage(null)
                            }
                            if(content){
                                setContent('')
                            }
                        }
                    };
                
                    fetchData();

                }
            }).catch((error) => {
                setLoading(false)
                setUpdateTitle(false)
                setUpdateSlug(false)
                setUpdateDescription(false)
                setUpdateContent(false)
                setUpdateCategory(false)
                setUpdateThumbnail(false)
                if(thumbnail){
                    setThumbnail(null)
                    setPreviewImage(null)
                }
                if(content){
                    setContent('')
                }
            })
        }
        catch (error){
          setLoading(false)
          console.log("Error fetching Login data:", error)
        }
        finally{
          //setLoading(false)
        }
      }
  
      fetchData()
})



  return (
    <Layout>

        {
            authorBlogsDeatil&&authorBlogsDeatil&&isAuthenticated ? 
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
                                onClick={()=>setOpen(true)}
                                className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                {
                                   authorBlogsDeatil.status==='published'?
                                    <>Draft</>:<>Publish</>
                                }                                
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
                            <dt className="text-sm font-medium text-gray-500">Slug</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateSlug ?
                                    <>
                                        <form onSubmit={onSubmit} className="flex w-full">

                                            <span className="flex-grow">
                                                <input                                                
                                                name='new_slug'
                                                type='text'
                                                className="border border-gray-400 rounded-lg w-full"
                                                {...register('new_slug', {
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
                                                onClick={()=>setUpdateSlug(false)}
                                                className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                Cancel
                                                </div>
                                            </span>
                                        </form>
                                    </>:
                                    <>
                                        <span className="flex-grow">{authorBlogsDeatil.slug}</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                            onClick={()=>setUpdateSlug(true)}
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
                            <dt className="text-sm font-medium text-gray-500">Thumbnail</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateThumbnail?
                                    <>

                                        {
                                            previewImage&&
                                            <img src={previewImage} className='object-cover w-80 h-72 p-4'/>
                                        }
                                        <form onSubmit={onSubmit} className="flex w-full">

                                            <span className="flex-grow">
                                                <input                                                
                                                name='thumbnail'
                                                type='file'
                                                className="border border-gray-400 rounded-lg w-full"
                                                {...register('thumbnail', {
                                                    required: {
                                                        value: false,
                                                        message: "es requerido"
                                                        }
                                                    })
                                                }
                                                onChange={e=>fileSelectedHandler(e)}
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
                                                onClick={()=>{
                                                    setUpdateThumbnail(false)
                                                    setThumbnail(null)
                                                    setPreviewImage(null)
                                                }}
                                                className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                Cancel
                                                </div>
                                            </span>
                                        </form>
                                    </>:
                                    <>
                                        <span className="flex-grow">
                                        {
                                            authorBlogsDeatil.thumbnail &&
                                            <img src={authorBlogsDeatil.thumbnail} className='object-cover w-full h-72'/>
                                        }
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                            onClick={()=>setUpdateThumbnail(true)}
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
                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateDescription ?
                                    <>
                                        <form onSubmit={onSubmit} className="flex w-full">

                                            <span className="flex-grow">
                                                <textarea
                                                rows={3}                                                
                                                name='description'
                                                type='text'
                                                className="border border-gray-400 rounded-lg w-full"
                                                {...register('description', {
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
                                                onClick={()=>setUpdateDescription(false)}
                                                className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                Cancel
                                                </div>
                                            </span>
                                        </form>
                                    </>:
                                    <>
                                        <span className="flex-grow">{authorBlogsDeatil.description}</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                            onClick={()=>setUpdateDescription(true)}
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
                            <dt className="text-sm font-medium text-gray-500">Content</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateContent ?
                                    <>
                                        <form onSubmit={onSubmit} className="flex w-full">

                                            <span className="flex-grow">
                                            <textarea
                                                rows={3}                                                
                                                name='description'
                                                type='content'
                                                className="border border-gray-400 rounded-lg w-full"
                                                {...register('content', {
                                                    required: {
                                                        value: true,
                                                        message: "es requerido"
                                                        }
                                                    })
                                                }
                                            />
                                            
                                            {/*<CKEditor
                                                editor={ClassicEditor}
                                                name='content'
                                                // ... otras propiedades
                                                ref={register({
                                                    required: {
                                                        value: true,
                                                        message: "es requerido"
                                                    }
                                                })}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    console.log({ event, editor, data });
                                                    setContent(data);
                                                }}
                                                onBlur={() => {
                                                    // Desencadena manualmente la validación del campo content
                                                    trigger('content');
                                                }}
                                            />*/}
                                            </span>
                                            <span className="ml-4 flex-shrink-0">
                                                <button
                                                type="submit"
                                                className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                Save
                                                </button>
                                                <div
                                                onClick={()=>setUpdateContent(false)}
                                                className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                Cancel
                                                </div>
                                            </span>
                                        </form>
                                    </>:
                                    <>
                                        <span className="flex-grow text-lg">
                                            {
                                                authorBlogsDeatil.content ?
                                                <div className="prose prose-lg max-w-6xl prose-indigo mx-auto mt-6 text-gray-500">
                                                    
                                                    {
                                                        showFullContent ?
                                                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(authorBlogsDeatil.content)}} />
                                                        :
                                                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(authorBlogsDeatil.content.length) > 350 ? DOMPurify.sanitize(authorBlogsDeatil.content.slice(0,249)):DOMPurify.sanitize(authorBlogsDeatil.content)}} />
                                                    }
                                                    {
                                                        DOMPurify.sanitize(authorBlogsDeatil.content.length) > 350 ?
                                                        <>
                                                        {
                                                            showFullContent ?
                                                            <button
                                                            className="w-full border border-gray-900 text-gray-900 bg-white py-2"
                                                            onClick={()=>setShowFullContent(false)}
                                                            >
                                                                Show Less
                                                            </button>
                                                            :
                                                            <button
                                                            className="w-full border border-gray-900 text-gray-900 bg-white py-2"
                                                            onClick={()=>setShowFullContent(true)}
                                                            >
                                                                Show More
                                                            </button>
                                                        }
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                    }
                                                </div>
                                                :
                                                <p className=" w-full py-2 bg-gray-100 mt-4 text-lg font-regular text-gray-800 leading-8"></p>
                                            }
                                        </span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                            onClick={()=>setUpdateContent(true)}
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
                            <dt className="text-sm font-medium text-gray-500">Category</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {
                                    updateCategory ?
                                    <>
                                        <form onSubmit={onSubmit} className="flex w-full">

                                            <span className="flex-grow">

                                                {
                                                    //console.log(categories.data[0].name)
                                                    categories &&
                                                    categories !== null &&
                                                    categories !== undefined &&
                                                    categories.data.map(category=>{
                                                        //console.log(category.sub_category)
                                                        if(category.sub_category.length === 0){
                                                            return(
                                                                <div key={category.id} className='flex items-center h-5'>
                                                                <input
                                                                    
                                                                    name='category'
                                                                    type='radio'                                                                    
                                                                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                    value={category.id}
                                                                    {...register('category', {
                                                                        required: {
                                                                            value: true,
                                                                            message: "es requerido"
                                                                            }
                                                                        })
                                                                    }
                                                                />
                                                                <label className="ml-3 text-lg dark:text-dark-txt text-gray-900 font-light">
                                                                    {category.name}
                                                                </label>
                                                                </div>
                                                            )
                                                        }
                                                        
                                                        else{
            
                                                            let result = []
                                                            result.push(
                                                                <div key={category.id} className='flex items-center h-5 mt-2'>
                                                                <input                                                                    
                                                                    name='category'
                                                                    type='radio'
                                                                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                    value={category.id}
                                                                    {...register('category', {
                                                                        required: {
                                                                            value: true,
                                                                            message: "es requerido"
                                                                            }
                                                                        })
                                                                    }
                                                                />
                                                                <label className="ml-3 text-lg dark:text-dark-txt text-gray-900 font-regular">
                                                                    {category.name}
                                                                </label>
                                                                </div>
                                                            )
            
                                                            category.sub_category.map(sub_category=>{
                                                                result.push(
                                                                    <div key={sub_category.id} className='flex items-center h-5 ml-2 mt-1'>
                                                                    <input                                                                        
                                                                        name='category'
                                                                        type='radio'
                                                                        className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                                        value={category.id}
                                                                        {...register('category', {
                                                                            required: {
                                                                                value: true,
                                                                                message: "es requerido"
                                                                                }
                                                                            })
                                                                        }
                                                                    />
                                                                    <label className="ml-3 text-lg dark:text-dark-txt text-gray-900 font-light">
                                                                        {sub_category.name}
                                                                    </label>
                                                                    </div>
                                                                )
                                                            })
                                                            return result
                                                        }
            
                                                    })

                                                }
                                                
                                            </span>
                                            <span className="ml-4 flex-shrink-0">
                                                <button
                                                type="submit"
                                                className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                Save
                                                </button>
                                                <div
                                                onClick={()=>setUpdateCategory(false)}
                                                className="cursor-pointer inline-flex rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                Cancel
                                                </div>
                                            </span>
                                        </form>
                                    </>:
                                    <>
                                        <span className="flex-grow">{authorBlogsDeatil.category.name}</span>
                                        <span className="ml-4 flex-shrink-0">
                                            <button
                                            onClick={()=>setUpdateCategory(true)}
                                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                            Update
                                            </button>
                                        </span>
                                    </>
                                }
                            
                            </dd>
                        </div>


                        

                    


                    
                    
                    {/*<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
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
                    </div>*/}
                    </dl>
                </div>
                
                {/*******************************************MODAL******************************************************/}

                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setOpen}>
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                                <div>
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    {
                                        authorBlogsDeatil.title && authorBlogsDeatil.description && authorBlogsDeatil.slug&& authorBlogsDeatil.content ?
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        :
                                        <XMarkIcon className="h-6 w-6 text-rose-600" aria-hidden="true" />

                                    }
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    {
                                        authorBlogsDeatil.status === 'published' ?
                                        <span>Draft this post?</span>
                                        :
                                        <span>Publish this post?</span>

                                    }
                                    </Dialog.Title>
                                    <div className="mt-2">
                                    {
                                        authorBlogsDeatil.title && authorBlogsDeatil.description && authorBlogsDeatil.slug&& authorBlogsDeatil.content ?
                                        <></>
                                        :
                                        <p className="text-sm text-gray-500">
                                            To publish this post you must add: Title, Description, Slug and Content.
                                        </p>
                                        

                                    }
                                    </div>
                                </div>
                                </div>
                                {
                                    (authorBlogsDeatil.title && authorBlogsDeatil.description && authorBlogsDeatil.slug&& authorBlogsDeatil.content) &&
                                    <>                                    
                                        {
                                            authorBlogsDeatil.status === 'published' ?
                                            <form onSubmit={e=>onSubmitDraft(e)} className="mt-5 sm:mt-6">
                                                    <button
                                                        type="submit"
                                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                                        
                                                    >
                                                            <span>Draft</span>
                                                    </button>
                                                    
                                                    <></>
                                            </form>
                                            :
                                            <form onSubmit={e=>onSubmitPublish(e)} className="mt-5 sm:mt-6">
                                                    <button
                                                        type="submit"
                                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                                        
                                                    >
                                                            <span>Publish</span>
                                                    </button>
                                                    
                                                    <></>
                                            </form>
                                        }
                                    </>
                                }
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                        </div>
                    </Dialog>
                            </Transition.Root>

                {/******************************************************************************************************/}
                

            </>
            :
            <>Lading...</>
        }
          
    </Layout>
  )
}
