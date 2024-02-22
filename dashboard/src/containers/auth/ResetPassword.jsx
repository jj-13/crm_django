import { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux"
import { useForm } from "react-hook-form"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { authCheckAuthenticated, authLoadUser, authResetPassword, authRefresh } from "../../Store/Auth"
import { selectIsAuthenticated } from "../../Store/Selector"
import { EnvelopeIcon } from "@heroicons/react/24/outline";


export const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {register, handleSubmit, 
    formState:{errors}, watch, setValue, reset} = useForm()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  
  useEffect(()=>{
    isAuthenticated ? <></>:
    <>      
    {authRefresh()}
    {authCheckAuthenticated()}
    {/*authLoadUser()*/}
    </>

    
  },[isAuthenticated])
 
    const onSubmit = handleSubmit( (data) => {
        //console.log('datos form: ', data)
        const fetchData = async () => {
          try{
            const body = {
              form: {
                email: data.email,
              },              
              headers: {              
                  'Content-Type': 'application/json', // Agrega el encabezado Content-Type                
              } 
            }
            
            await dispatch(authResetPassword(body))
            navigate('/')
            /* .then((result) =>{
              if (result.payload){     
                //console.log(result.payload.data[0].access) 
                //'Authorization': `JWT ${result.payload.data[0].access}` 
                const body1 = {                              
                  headers: {              
                    'Content-Type': 'application/json', // Agrega el encabezado Content-Type  
                    'Accept': 'application/json',  
                    'Authorization': `JWT ${result.payload.data[0].access}`
                  } 
                }          

                dispatch(authLoadUser(body1))
              }
            }).catch((error) => {
                console.log(error)
            }) */
          }
          catch (error){
            console.log("Error fetching Login data:", error)
          }
          finally{
            //setLoading(false)
          }
        }
    
        fetchData()
    })

    if(isAuthenticated){
      return <Navigate to='/dashboard'/>
    }
    
    

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://bafybeiczl4dcxupma2zeyilkukfl4yge64axnhajd722wxgin62mtts6uy.ipfs.w3s.link/murkivamarketing.png"
              alt="Your Company"
            />
          </div>
          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"                  
                  type="email"                  
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  {...register('email', {
                    required: {
                        value: true,
                        message: "es requerido"
                      }
                    })
                  }
                />
              </div>
              
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Send Email
              </button>
            </div>

            <div className="text-sm">
                <span className="">Already have and account? </span>
                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                   Login
                </Link>
            </div>
          </form>         
          
        </div>
      </div>
    </>
  )
}
