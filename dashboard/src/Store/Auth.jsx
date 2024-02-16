import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLogin, getLoadUser, getCheckAuthenticated, getResetPassword, getResetPasswordConfirm, getRefresh } from '../api/auth.api'

export const auth = createAsyncThunk(
    'auth',
    async () => {
        //console.log(userCredentials)   
        const response_api = await getLogin()
        return response_api
    }
)

export const authLoadUser = createAsyncThunk(
    'auth/load',
    async () => {
        //console.log(userCredentials)   
        const response_api = await getLoadUser()
        return response_api
    }
)

export const authCheckAuthenticated = createAsyncThunk(
    'auth/checkAuthenticated',
    async () => {
        //console.log(userCredentials)   
        const response_api = await getCheckAuthenticated()
        return response_api
    }
)

export const authResetPassword = createAsyncThunk(
    'auth/resetPassword',
    async () => {
        //console.log(userCredentials)   
        const response_api = await getResetPassword()
        return response_api
    }
)

export const authResetPasswordConfirm = createAsyncThunk(
    'auth/resetPasswordConfirm',
    async () => {
        //console.log(userCredentials)   
        const response_api = await getResetPasswordConfirm()
        return response_api
    }
)

export const authRefresh = createAsyncThunk(
    'auth/refresh',
    async () => {
        //console.log(userCredentials)   
        const response_api = await getRefresh()
        return response_api
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState:{ 
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),        
        isAuthenticated: null,
        user: null,
        loading: false,
        user_loading: true,        
    },
    extraReducers:(builder)=>{
        builder
        //login
        .addCase(auth.pending, (state)=>{
            console.log('auth entro pending')
            //state.token = null
        })
        .addCase(auth.fulfilled, (state, action)=>{
            console.log('auth entro fulfilled')
            state.access = action.payload.access
            state.refresh =  action.payload.refresh
            state.isAuthenticated =  true
        })
        .addCase(auth.rejected, (state, action)=>{
            console.log('auth entro rejected')
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access denied! invalid credentials'
                state.access = null
                state.refresh = null
                state.isAuthenticated = false
                state.user = null 
            }
            else{
                console.log('auth-checking entro 400 backend')
                state.error = action.error.message
                state.access = null
                state.refresh = null
                state.isAuthenticated = false
                state.user = null 
            }
        })
        //load user
        .addCase(authLoadUser.pending, (state)=>{
            console.log('authLoadUser entro pending')
            state.loading= true
        })
        .addCase(authLoadUser.fulfilled, (state, action)=>{
            console.log('authLoadUser entro fulfilled')  
            state.user = action.payload.data
            state.user_loading = false
        })
        .addCase(authLoadUser.rejected, (state, action)=>{
            console.log('authLoadUser entro rejected')
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access denied! invalid credentials'
                state.user = null,
                state.user_loading = false
                state.loading= false
            }
            else{
                console.log('authLoadUser entro 400 backend')
                state.error = action.error.message
                state.user = null,
                state.user_loading = false
                state.loading= false
            }
        }) 
        //CheckAuthenticated
        .addCase(authCheckAuthenticated.pending, (state)=>{
            console.log('authCheckAuthenticated entro pending')            
        })
        .addCase(authCheckAuthenticated.fulfilled, (state, action)=>{
            console.log('authCheckAuthenticated entro fulfilled')  
            state.isAuthenticated = true
        })
        .addCase(authCheckAuthenticated.rejected, (state, action)=>{
            console.log('authCheckAuthenticated entro rejected')
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access denied! invalid credentials'
                state.isAuthenticated = false
                state.access = null
                state.access= null
            }
            else{
                console.log('authCheckAuthenticated entro 400 backend')
                state.error = action.error.message
                state.isAuthenticated = false
                state.access = null
                state.access= null
            }
        }) 
        //authResetPassword
        .addCase(authResetPassword.pending, (state)=>{
            console.log('authResetPassword entro pending')            
        })
        .addCase(authResetPassword.fulfilled, (state, action)=>{
            console.log('authResetPassword entro fulfilled')  
        })
        .addCase(authResetPassword.rejected, (state, action)=>{
            console.log('authResetPassword entro rejected')
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access denied! invalid credentials'                
            }
            else{
                console.log('authResetPassword entro 400 backend')
                state.error = action.error.message
                
            }
        }) 
        //authResetPasswordConfirm
        .addCase(authResetPasswordConfirm.pending, (state)=>{
            console.log('authResetPasswordConfirm entro pending')            
        })
        .addCase(authResetPasswordConfirm.fulfilled, (state, action)=>{
            console.log('authResetPasswordConfirm entro fulfilled')  
        })
        .addCase(authResetPasswordConfirm.rejected, (state, action)=>{
            console.log('authResetPasswordConfirm entro rejected')
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access denied! invalid credentials'                
            }
            else{
                console.log('authResetPasswordConfirm entro 400 backend')
                state.error = action.error.message
                
            }
        }) 
        //authRefresh
        .addCase(authRefresh.pending, (state)=>{
            console.log('authRefresh entro pending')            
        })
        .addCase(authRefresh.fulfilled, (state, action)=>{
            console.log('authRefresh entro fulfilled') 
            state.access = action.payload.data
        })
        .addCase(authRefresh.rejected, (state, action)=>{
            console.log('authRefresh entro rejected')
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access denied! invalid credentials'  
                state.access = null
                state.refresh = null
                state.isAuthenticated = false
                state.user = null              
            }
            else{
                console.log('authRefresh entro 400 backend')
                state.error = action.error.message
                state.access = null
                state.refresh = null
                state.isAuthenticated = false
                state.user = null                 
            }
        }) 
               
    }
})

export default authSlice.reducer