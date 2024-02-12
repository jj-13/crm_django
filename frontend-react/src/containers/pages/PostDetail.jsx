import {useEffect, useState} from 'react'
import { Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import {Layout} from "../../hocs/layouts/Layout"
import {Navbar} from "../../components/navigation/Navbar"
import {Footer} from "../../components/navigation/Footer"
import { blogDetail } from "../../Store/BlogsDetailSlice"
import moment from "moment";
import DOMPurify from 'dompurify'


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
    const [blogsDetail, setBlogsDetail] = useState(getBlogsDetail())//quitar el getBlogsDetail y validar el return para los primeros valores undifiend

    const slug = params.slug
   
    useEffect(()=>{
        window.scrollTo(0,0)
        dispatch(blogDetail(slug))
         // Obtenemos el valor actualizado del localStorage       
        setBlogsDetail(getBlogsDetail())
               
        console.log('comparando!!!!!!!!!! ' + slug + ' === ' + blogsDetail.data[0].slug)
        
        
    }, [dispatch, slug])
  
    return (
        <Layout>
            <Navbar/>
            <div className="pt-28">
            {
                blogsDetail.data[0].slug
            }   
            {
                blogsDetail.data[0].slug === slug ?
                    <div className="pt-24">
                        <div className="relative bg-gray-200">
                            <div className="absolute inset-0">
                            <img
                                className="h-full w-full object-cover"
                                src={blogsDetail.data[0].thumbnail}
                                alt=""
                            />
                            <div className="absolute inset-0 bg-gray-200 mix-blend-multiply" aria-hidden="true" />
                            </div>
                            <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">{blogsDetail.data[0].title}</h1>
                                <div className="min-w-0 flex-1 p-4 pt-8">
                                    <div className="">
                                        <span className=" hover:text-orange-500  mx-1 font-medium text-gray-800 text-sm "><Link to={`/category/${blogsDetail.data[0].category.slug}`}>{blogsDetail.data[0].category.name}</Link></span> <span className="text-gray-300">&middot;</span> 
                                        <span className="mt-2 ml-2 mr-1 font-medium text-gray-800 text-sm">{moment(blogsDetail.data[0].published).format('LL')}</span> <span className="text-gray-300">&middot;</span>
                                        <span className="mt-2 mx-2 font-medium text-gray-800 text-sm">{blogsDetail.data[0].time_read} min read</span> 
                                        <p className="mt-4 text-lg font-regular text-gray-800 leading-8">{blogsDetail.data[0].description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden bg-white py-16">                    
                            <div className="relative px-4 sm:px-6 lg:px-8">                            
                                <div className="prose prose-lg max-w-6xl prose-indigo mx-auto mt-6 text-gray-500">
                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogsDetail.data[0].content)}} />
                                </div>
                            </div>
                        </div>
                    </div>
                :
                <>Loading</>
            }
           
            </div>            
            <Footer/>
        </Layout>
    )
}
