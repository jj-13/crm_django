import axios from "axios";

const contactApi = axios.create({
    //baseURL:"http://ip172-18-0-98-cmgjqaio7r5g00fodlng-8000.direct.labs.play-with-docker.com/api"
    //baseURL:"http://127.0.0.1:8000/api"
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
})

export const postContact = async (body) => {
    console.log('info contact: ', body)
    let formData = new FormData()  
        formData.append('name', body.form.name)  
        formData.append('email', body.form.email)  
        formData.append('phone', body.form.phone)  
        formData.append('subject', body.form.subject)  
        formData.append('message', body.form.message)  
        formData.append('budget', body.form.budget)         
        
        const request = await contactApi.post(`/contact/`, formData, {
            headers:  body.headers,
        })    
        const response = request.data
        return response
}