import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { authCheckAuthenticated, authLoadUser, auth, authRefresh } from "../../Store/Auth"


export const Login = () => {
  const dispatch = useDispatch()
  const {register, handleSubmit, 
    formState:{errors}, watch, setValue, reset} = useForm()

    useEffect(()=>{
      // isAuthenticated ? <></>:
      // <>
      // {refresh()}
      // {check_authenticated()}
      // {load_user()}
      // </>

      
    },[])
 
    const onSubmit = handleSubmit( (data) => {
        
        const fetchData = async () => {
          try{
            const body = {
              form: {
                email: data.email,
                password: data.password,
              },              
              headers: {              
                  'Content-Type': 'application/json', // Agrega el encabezado Content-Type                
              } 
            }
            await dispatch(auth(body)).then((result) =>{
              if (result.payload){     
                //console.log(result.payload.data[0].access) 
                //'Authorization': `JWT ${result.payload.data[0].access}` 
                const body1 = {                              
                  headers: {              
                    'Content-Type': 'application/json', // Agrega el encabezado Content-Type  
                    //'Accept': 'application/json',  
                    'Authorization': `JWT ${result.payload.data[0].access}`                                
                    //'Authorization': `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4OTg1MjgwLCJpYXQiOjE3MDgzODA0ODAsImp0aSI6IjIwMmU2ZTM1ZjlmNDQ1N2E4YzE3YWU5MWYwNDJjMTk1IiwidXNlcl9pZCI6NH0.N_ULf36EDETnv1hIobZl3WWUsKva69XE1rlQv_mGU9k`                           
                  } 
                }          

                dispatch(authLoadUser(body1))
              }
          }).catch((error) => {
             console.log(error)
          })
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

    /* if(isAuthenticated){
      return <Navigate to='/dashboard'/>
    } */

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
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"                  
                  type="password"                  
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  {...register('password', {
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
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
