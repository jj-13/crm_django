import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { postContact } from '../api/contact.api'
import { Switch } from '@headlessui/react'
import CircleLoader from "react-spinners/CircleLoader"


export const Contact = () => {

    const [enabled, setEnabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const {register, handleSubmit, trigger,
        formState:{errors}, watch, setValue, reset} = useForm()
    

    const onSubmit = handleSubmit( (data) => {    
        console.log('datos data: ',data)   
        
        const fetchData = async () => {
            setLoading(true)
            try{      
                                
                const body = { 
                    form: {                      
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        subject: data.subject,
                        message: data.message,
                        budget: data.budget,                                   
                    },                            
                    headers: {                                    
                        'Accept': 'application/json',  
                        'Content-Type': 'application/json', 
                    }
                }
                await postContact(body)
    
                setLoading(false)
                setValue('name','')
                setValue('email','')
                setValue('phone','')
                setValue('subject','')
                setValue('message','')
                setValue('budget','')
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
    
    <div className="w-full h-80 shadow-card rounded-lg p-12 overscroll-y-auto overflow-y-auto">
    {/*<div className="w-full h-auto shadow-card rounded-lg p-12 overscroll-y-auto overflow-y-auto">*/}
            <h1 className="font-bold text-4xl text-gray-900">Want to work with us?</h1>
            <p className="font-regular mt-4 text-2xl text-gray-700">Just tell us about your project, what are your goals, and let's start.</p>
            <form onSubmit={e=>onSubmit(e)} className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"                  
                  autoComplete="name"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Full name"
                  {...register('name', {
                    required: {
                        value: true,
                        message: "es requerido"
                        }
                    })
                  }
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"                  
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Email"
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
                <label htmlFor="price" className="sr-only">
                    Phone
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">+</span>
                    </div>
                    <input
                    id="phone"
                    type="number"
                    name="phone"                    
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="51 999 123 456"
                    aria-describedby="price-currency"
                    {...register('phone', {
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
                <label className="sr-only">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"                  
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Subject"
                  {...register('subject', {
                    required: {
                        value: true,
                        message: "es requerido"
                        }
                    })
                  }
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"                  
                  rows={4}
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Message"
                  defaultValue={''}
                  {...register('message', {
                    required: {
                        value: true,
                        message: "es requerido"
                        }
                    })
                  }
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Budget
                </label>
                <select
                    id="budget"
                    name='budget'
                    className="mt-1 block w-full pl-3 pr-10 py-4 rounded-md text-base border text-gray-500 border-gray-300 "
                    {...register('budget', {
                        required: {
                            value: false,
                            message: "es requerido"
                            }
                        })
                    }
                >
                    <option value="" className="text-gray-400">Select a Budget (Optional)</option>
                    <option value="0-5k" className="text-gray-600">$0,5000</option>
                    <option value="5-10k" className="text-gray-600">$5,000 - 10,000</option>
                    <option value="10-25k" className="text-gray-600">$10,000 - 25,000</option>
                </select>
              </div>
              <div className="px-4 py-5 sm:px-6">
                    <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                        <div className="grid-cols-12 ml-4 mt-2 flex">
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className={`${enabled ? 'bg-orange-500' : 'bg-gray-300'}
                                col-span-3 relative inline-flex h-[32px] w-[72px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span
                                aria-hidden="true"
                                className={`${enabled ? 'translate-x-10' : 'translate-x-0'}
                                    pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                            <p className="col-span-9 ml-4 text-md font-regular leading-6 text-gray-600">
                                By selecting this you accept the <span className="text-blue-500"><Link to='/terms'>Terms of service</Link></span> and <span className="text-blue-500"><Link to='/privacy'>Privacy policy</Link></span>.
                            </p>
                            
                        </div>
                        <div className="ml-4 mt-2 flex-shrink-0">
                            {
                                loading ?
                                <div
                                    className="relative inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-3 text-lg font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                >
                                    <CircleLoader loading={loading} size={25} color="#ffffff"/>
                                </div>
                                :
                                <button
                                    type="submit"
                                    className="relative inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-3 text-lg font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                >
                                    Send Message
                                </button>

                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
  )
}
