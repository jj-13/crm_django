import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import {Layout} from "../../hocs/layouts/Layout"
import {Navbar} from "../../components/navigation/Navbar"
import {Footer} from "../../components/navigation/Footer"
import { StarIcon } from '@heroicons/react/20/solid'
import CircleLoader from "react-spinners/CircleLoader"
import { optInContact } from "../../api/optin.api";

/*
Para el manejo de los optin se usa https://jonnathanrp13.activehosted.com/admin/index.php
*/
export const Optin = () => {
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const [loading, setLoading]=useState(false)

    const {register, handleSubmit, trigger,
        formState:{errors}, watch, setValue, reset} = useForm()

    const onSubmit = handleSubmit( (data) => {    
        console.log('datos data: ',data)   
        
        const fetchData = async () => {
            setLoading(true)
            try{      
                
                const tag = 1
                const list = 2
                
                const body = { 
                    form: {                      
                      email: data.email, 
                      tag: tag,
                      list: list,                                     
                    },                            
                    headers: {                                    
                        'Accept': 'application/json',  
                        'Content-Type': 'application/json', 
                    }
                }
                await optInContact(body)
    
                setLoading(false)
                setValue('email','')                     
                setTimeout(()=>{
                    navigate('/ebook/training')
                },1000)       
                alert('Message has been send.')
                
            }
            catch (error){          
              //console.log("Error fetching data:", error)
              alert('Error sending Message.')
            }
            finally{
              //setLoading(false)
            }
          }  
          fetchData()
            
    })

  return (
    <Layout>
        <Navbar/>
        <div className="pt-8">            
            <div className="bg-white pb-8 sm:pb-12 lg:pb-12">
                <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
                    <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
                        <div>
                            <div className="mt-10">
                            <div className="mt-6 sm:max-w-xl">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Earn your first $5,000 online
                                </h1>
                                <p className="mt-6 text-xl text-gray-500">
                                Make your first $5,000 with email marketing in 60 days!
                                </p>
                            </div>
                            <form onSubmit={onSubmit} className="mt-12 sm:flex sm:w-full sm:max-w-lg">
                                <div className="min-w-0 flex-1">
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"                                    
                                    name='email'
                                    className="block w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                    placeholder="Enter your email"
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: "es requerido"
                                            }
                                        })
                                    }
                                />
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-3">
                                    {
                                        loading ?
                                        <div
                                            className="block w-full rounded-md border border-transparent bg-orange-600 px-5 py-3 text-base font-medium text-white shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:px-10"
                                        >
                                            <CircleLoader loading={loading} size={25} color="#ffffff"/>
                                        </div>
                                        :
                                        <button
                                            type="submit"
                                            className="block w-full rounded-md border border-transparent bg-orange-600 px-5 py-3 text-base font-medium text-white shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:px-10"
                                        >
                                            Download Ebook
                                        </button>
                                    }
                                </div>
                            </form>

                            <div className="mt-6">
                                <div className="inline-flex items-center divide-x divide-gray-300">
                                <div className="flex flex-shrink-0 pr-5">
                                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                </div>
                                <div className="min-w-0 flex-1 py-1 pl-5 text-sm text-gray-500 sm:py-3">
                                    <span className="font-medium text-gray-900">Rated 5 stars</span> by over{' '}
                                    <span className="font-medium text-orange-600">500 beta users</span>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
                        <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                            <div className="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                            <img
                                className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                                src="https://tailwindui.com/img/component-images/top-nav-with-multi-column-layout-screenshot.jpg"
                                alt=""
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </Layout>
  )
}
