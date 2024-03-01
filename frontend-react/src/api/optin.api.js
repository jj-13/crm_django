import axios from "axios";

const optinApi = axios.create({
    //baseURL:"http://ip172-18-0-98-cmgjqaio7r5g00fodlng-8000.direct.labs.play-with-docker.com/api"
    baseURL:"http://127.0.0.1:8000/api"
})

export const optInContact = async (body) => {
    console.log('info optin: ', body)
    let formData = new FormData()  
    formData.append('email', body.form.email)  
    formData.append('tag', body.form.tag)  
    formData.append('list', body.form.list)  
    
    const request = await optinApi.post(`/v1/opt-in/`, formData, {
        headers:  body.headers,
    })    
    const response = request.data
    
    return response
}