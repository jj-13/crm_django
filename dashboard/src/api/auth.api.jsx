import axios from "axios";

const authApi = axios.create({
    //baseURL:"http://ip172-18-0-98-cmgjqaio7r5g00fodlng-8000.direct.labs.play-with-docker.com/api"
    baseURL: "http://127.0.0.1:8000/auth"
})

const blogApi = axios.create({
    //baseURL:"http://ip172-18-0-98-cmgjqaio7r5g00fodlng-8000.direct.labs.play-with-docker.com/api"
    baseURL: "http://127.0.0.1:8000/api"
})

/* const body = {
    form: {
        nombre: data.nombre,
        apellidos: data.apellidos,            
    },
    headers: {              
        'Content-Type': 'application/json', // Agrega el encabezado Content-Type
        // 'Content-Type': 'multipart/form-data', // Agrega el encabezado Content-Type
        // 'Authorization': `Bearer ${user.token}`,
    }  
}*/

export const getLoadUser = async (body1) => {
    //console.log(body1.headers)
        
    const request = await authApi.get('/users/me/', body1); 
    //console.log(request.data)
    const response = request.data
    
    //console.log(request.status)
    //console.log(response) 
    localStorage.setItem('load_user', JSON.stringify(response))
    //console.log(personaTable)
    return response
}

export const getLogin = async (body) => {
    //console.log(body)
    let formData = new FormData()
    formData.append('email', body.form.email)
    formData.append('password', body.form.password)

    const request = await authApi.post('/jwt/create/', formData, body.headers)
    //console.log(request.data)
    const response = request.data
    const loginObject = {}    
    const data = []
    data.push({
        refresh: response.refresh,
        access: response.access            
    })
    // console.log(request.status)
    // console.log(response)
    // console.log(loginObject)
    loginObject.data = data    
    localStorage.setItem('login', JSON.stringify(loginObject))
    //console.log(personaTable)
    return loginObject
}

export const getCheckAuthenticated = async (body) => {
    const tokeVerify = {}

    if (localStorage.getItem('access')){
        let formData = new FormData()
        let message = ''

        formData.append('token', body.form.token)

        const request = await authApi.get('/auth/jwt/create/', formData, body.headers)
        //console.log(request.data)
        if(request.status === 200){
            message = 'ok'
        }
        else{
            message = 'error'
        }
        // console.log(request.status)        
        // console.log(tokeVerify)
        tokeVerify.data = message    
        localStorage.setItem('toke_verify', JSON.stringify(tokeVerify))
        //console.log(personaTable)
        return tokeVerify

    }
    else{
        console.log('No hay token') 
        tokeVerify.data = 'error' 
        //console.log(personaTable)
        return tokeVerify       
    }   
    
}

export const getRefresh = async (body) => {
    const loginRefreshObject = {} 

    if (localStorage.getItem('refresh')){
        let formData = new FormData()
        
        formData.append('refresh', body.form.refresh)

        const request = await authApi.get('/auth/jwt/refresh/', formData, body.headers)
        //console.log(request.data)
        if(request.status === 200){
            const response = request.data['results']
               
            const data = []
            response.forEach(auth => {
                data.push({
                    access: auth.access            
                })
            });
            console.log(request.status)
            console.log(response)
            console.log(loginRefreshObject)
            loginRefreshObject.data = data    
            localStorage.setItem('login_refresh', JSON.stringify(loginRefreshObject))
            //console.log(personaTable)
            return loginRefreshObject
        }
        else{
            loginRefreshObject.message = 'Refresh fail' 
        }      

    }
    else{
        loginRefreshObject.message = 'Refresh fail'
        //console.log(personaTable)
        return loginRefreshObject       
    }   
    
}

export const getResetPassword  = async (body) => {
    const resetPasswordObject = {} 

    let formData = new FormData()
    
    formData.append('email', body.form.email)

    const request = await authApi.post('/users/reset_password/', formData, body.headers)
    //console.log(request.data)
    if(request.status === 200 | request.status === 204){                    
        resetPasswordObject.message = 'ok'
        return resetPasswordObject
    }
    else{
        resetPasswordObject.message = 'Reset password fail' 
        return resetPasswordObject
    }     
    
}

export const getResetPasswordConfirm = async (body) => {
    const resetPasswordConfirmObject = {} 

    let formData = new FormData()
    
    formData.append('uid', body.form.uid)
    formData.append('token', body.form.token)
    formData.append('new_password', body.form.new_password)
    formData.append('re_new_password', body.form.re_new_password)

    if (body.form.new_password===body.form.re_new_password){
        const request = await authApi.post('/users/reset_password_confirm/', formData, body.headers)
        //console.log(request.data)
        if(request.status === 200 | request.status === 204){                    
            resetPasswordConfirmObject.message = 'ok'
            return resetPasswordConfirmObject
        }
        else{
            resetPasswordConfirmObject.message = 'Reset password confirm fail' 
            return resetPasswordConfirmObject
        }     
    }
    else{
        resetPasswordConfirmObject.message = 'Reset password confirm fail' 
        return resetPasswordConfirmObject
    }
    
}

export const getAuthorBlogsPage = async (body) => {
    const request = await blogApi.get(`/author_list/?p=${body.page}`, body)
    //console.log(request.data)
    const response = request.data['results']
    const blogsObject = {}
    blogsObject.next = request.data['next']
    blogsObject.previous = request.data['previous']
    blogsObject.count = request.data['count']
    const data = []
    response.forEach(category => {
        data.push({
            id: category.id,
            title: category.title,
            slug: category.slug,
            thumbnail: category.thumbnail,
            category: category.category,
            description: category.description,
            content: category.content,
            status: category.status,
            time_read: category.time_read,
            published: category.published,
            view: category.view
        })
    });
    //console.log(request.status)
    //console.log(response)
    blogsObject.data = data    
    localStorage.setItem('author_blogs_pages', JSON.stringify(blogsObject))
    //console.log(personaTable)
    return blogsObject
}

export const getCategories = async () => {
    const request = await blogApi.get('/categories/')
    const response = request.data
    const categoriesObject = {}
    //categoriesObject.columns = ['Id', 'Nombre', 'Apellidos', 'Tipo documento', 'Documento', 'Hobbie']
    const data = []
    response.forEach(category => {
        data.push({
            id: category.id,
            name: category.name,
            slug: category.slug,
            view: category.view
        })
    });
    //console.log(request.status)
    //console.log(response)
    categoriesObject.data = data    
    localStorage.setItem('categories', JSON.stringify(categoriesObject))
    //console.log(personaTable)
    return categoriesObject
}

export const getBlogsDetail = async (slug) => {
    const request = await blogApi.get(`/blog/${slug}/`)    
    const response = request.data.message
    const blogsObject = {}    
    const data = []
    data.push({
        id: response.id,
        title: response.title,
        slug: response.slug,
        thumbnail: response.thumbnail,
        category: response.category,
        description: response.description,
        content: response.content,
        status: response.status,
        time_read: response.time_read,
        published: response.published,
        view: response.view
    })
    console.log(request.status)
    console.log(response)
    blogsObject.data = data    
    localStorage.setItem('blogs_detail', JSON.stringify(blogsObject))
    //console.log(personaTable)
    return blogsObject
}

export const getBlogsUpdateDetail = async (body) => {
    
    let formData = new FormData()    
    formData.append('title', body.form.title)
    formData.append('slug', body.slug)
    formData.append('new_slug', body.form.new_slug)
    
    const request = await blogApi.put(`/blog/${body.slug}/`, formData, {
        headers:  body.headers,
        params: body.params
    })    
    const response = request.data/*.message
    const blogsObject = {}    
    const data = []
    data.push({
        id: response.id,
        title: response.title,
        slug: response.slug,
        thumbnail: response.thumbnail,
        category: response.category,
        description: response.description,
        content: response.content,
        status: response.status,
        time_read: response.time_read,
        published: response.published,
        view: response.view
    })
    console.log(request.status)
    console.log(response)
    blogsObject.data = data    
    localStorage.setItem('blogs_detail', JSON.stringify(blogsObject))
    //console.log(personaTable)
    return blogsObject*/
    return response
}