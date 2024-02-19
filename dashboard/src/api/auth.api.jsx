import axios from "axios";

const authApi = axios.create({
    //baseURL:"http://ip172-18-0-98-cmgjqaio7r5g00fodlng-8000.direct.labs.play-with-docker.com/api"
    baseURL: "http://127.0.0.1:8000/auth"
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
    console.log(body1.headers)
    
    let formData = new FormData()
    
    const request = await authApi.get('/users/me/', {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${body1.headers.Authorization}`,
        },
        credentials: 'include'
    }); 
    console.log(request.data)
    const response = request.data
    const loadUserObject = {}    
    const data = []
    response.forEach(auth => {
        data.push({
            id: auth.id,
            username: auth.username,
            email: auth.email,            
            name: auth.name,            
            last_name: auth.last_name,            
            is_editor: auth.is_editor            
        })
    });
    console.log(request.status)
    console.log(response)
    console.log(loadUserObject)
    loadUserObject.data = data    
    localStorage.setItem('load_user', JSON.stringify(loadUserObject))
    //console.log(personaTable)
    return loadUserObject
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
    console.log(request.status)
    console.log(response)
    console.log(loginObject)
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
        console.log(request.status)
        
        console.log(tokeVerify)
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
    
    formData.append('refresh', body.form.refresh)

    const request = await authApi.get('/auth/users/reset_password/', formData, body.headers)
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
        const request = await authApi.get('/auth/users/reset_password_confirm/', formData, body.headers)
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