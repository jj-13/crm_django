import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import moment from 'moment'

export const BlogCardSearch = ({data, index}) => {
  function navigateCategory(url){
        console.log(url)
  }
  return (
    <li 
        >
            <Link to={`/blog/${data.slug}`}
                onMouseEnter={()=>{
                    // const img = document.getElementById(index)
                    // img.classList.add('object-fill')
                    const title = document.getElementById(`title` + data.id)
                    title.classList.add('text-orange-500')
                }} 
                onMouseLeave={()=>{
                    // const img = document.getElementById(index)
                    // img.classList.remove('object-fill')
                    const title = document.getElementById(`title` + data.id)
                    title.classList.remove('text-orange-500')
                }}
            className="block transition duration-300 ease-in-out">
              <div className="flex items-center   my-10 ">
                <div className="lg:flex min-w-0 lg:flex-1 items-center">
                  
                  <div className="min-w-0 flex-1 px-8 p-4 ">
                    <p id={`title` + data.id} className="  leading-10 text-3xl pb-4 font-semibold transition duration-300 ease-in-out">{data.title.length > 80 ? data.title.slice(0,79):data.title}</p>
                    <div className="">

                        <span className=" hover:text-orange-500  mx-1 font-medium text-gray-800 text-sm "><button onClick={()=>navigateCategory(`/category/${data.category.slug}`)}>{data.category.name}</button></span> <span className="text-gray-300">&middot;</span> 
                        <span className="mt-2 ml-2 mr-1 font-medium text-gray-800 text-sm">{moment(data.published).format('LL')}</span> <span className="text-gray-300">&middot;</span>
                        <span className="mt-2 mx-2 font-medium text-gray-800 text-sm">{data.time_read} min read</span> 
                        <p className="mt-4 text-lg font-regular text-gray-800 leading-8">{data.description.length > 150 ? data.description.slice(0,149):data.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
  )
}
BlogCardSearch.propTypes = {    
    data: PropTypes.object,    
    index: PropTypes.number
}