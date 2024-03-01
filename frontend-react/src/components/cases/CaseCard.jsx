import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

export const CaseCard = ({data,index}) => {
  //const history = useHistory();
  const handleNavigation = (url) => {
    //history.push(url);
    console.log(url)
  }  

  return (
    <Link 
        to={data.href}
        onMouseEnter={()=>{
            const title_element = document.getElementById(index)
            title_element.classList.add('text-orange-500')
            const img = document.getElementById(data.id)
            img.classList.add('object-scale-down')
            //console.log(index)
            //console.log(title_element)
            //console.log(data)
            //console.log(data['id'])
        }} 
        onMouseLeave={()=>{
            const title_element = document.getElementById(index)
            title_element.classList.remove('text-orange-500')
            const img = document.getElementById(data.id)
            img.classList.remove('object-scale-down')
        }} 
        
        className="flex flex-col overflow-hidden  rounded-lg shadow-lg">
            <div className="flex-shrink-0">
                <img id={data.id} className="h-96 w-full transition duration-400 ease-in-out object-cover" src={data.imageUrl} alt="" />
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                <p className="text-xl font-medium text-gray-800">
                    {/*<a href={data.category.href} className="hover:underline">
                    {data.category.name}
                    </a>*/}
                    <span onClick={() => handleNavigation(data.category.href)} className="hover:underline cursor-pointer">
                    {data.category.name}
                    </span>
                </p>
                {/*<a href={data.href} className="mt-2 block">
                    <p id={index} className="lg:text-4xl pt-4 pb-6 text-2xl font-semibold transition duration-400 ease-in-out text-gray-900">{data.title}</p>
                    <p className="mt-3 text-2xl space-y-2 leading-9 text-gray-500">{data.description}</p>
                </a>*/}
                <span onClick={() => handleNavigation(data.href)} className="mt-2 block cursor-pointer">
                    <p id={index} className="lg:text-4xl pt-4 pb-6 text-2xl font-semibold transition duration-400 ease-in-out text-gray-900">{data.title}</p>
                    <p className="mt-3 text-2xl space-y-2 leading-9 text-gray-500">{data.description}</p>
                </span>
                </div>
            </div>
        </Link>
  )
}
CaseCard.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number
}