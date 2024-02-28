import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogsDetail, getBlogsUpdateDetail, getBlogsDeleteDetail } from '../api/auth.api'

export const blogDetail = createAsyncThunk(
    'blog_detail',
    async (slug) => {
        //console.log(userCredentials)   
        const response_api = await getBlogsDetail(slug)
        return response_api
    }
)

export const blogUpdateDetail = createAsyncThunk(
    'blog_update_detail',
    async (body) => {
        //console.log(userCredentials)   
        const response_api = await getBlogsUpdateDetail(body)
        return response_api
    }
)

export const blogUpdateDelete = createAsyncThunk(
    'blog_delete_detail',
    async (body) => {
        //console.log(userCredentials)   
        const response_api = await getBlogsDeleteDetail(body)
        return response_api
    }
)

const blogDetailSlice = createSlice({
    name: 'blog_detail',
    initialState:{ 
        rows:[]
    },
    extraReducers:(builder)=>{
        builder
        //list
        .addCase(blogDetail.pending, (state)=>{
            console.log('blogDetail entro pending')
            //state.token = null
        })
        .addCase(blogDetail.fulfilled, (state, action)=>{
            console.log('blogDetail entro fulfilled')
            state.rows = [...action.payload.data]
        })
        .addCase(blogDetail.rejected, (state, action)=>{
            console.log('blogDetail entro rejected')
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access denied! invalid credentials'
            }
            else{
                console.log('user-checking entro 400 backend')
                state.error = action.error.message
            }
        })
        //update
        .addCase(blogUpdateDetail.pending, (state)=>{
            console.log('blogUpdateDetail entro pending')
            //state.token = null
        })
        .addCase(blogUpdateDetail.fulfilled, (state, action)=>{
            console.log('blogUpdateDetail entro fulfilled')
            //state.rows = [...action.payload.data]
        })
        .addCase(blogUpdateDetail.rejected, (state, action)=>{
            console.log('blogUpdateDetail entro rejected')
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access denied! invalid credentials'
            }
            else{
                console.log('blogUpdateDetail entro 400 backend')
                state.error = action.error.message
            }
        })
        //delete
        .addCase(blogUpdateDelete.pending, (state)=>{
            console.log('blogUpdateDelete entro pending')
            //state.token = null
        })
        .addCase(blogUpdateDelete.fulfilled, (state, action)=>{
            console.log('blogUpdateDelete entro fulfilled')
            //state.rows = [...action.payload.data]
        })
        .addCase(blogUpdateDelete.rejected, (state, action)=>{
            console.log('blogUpdateDelete entro rejected')
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access denied! invalid credentials'
            }
            else{
                console.log('blogUpdateDelete entro 400 backend')
                state.error = action.error.message
            }
        })
               
    }
})

export default blogDetailSlice.reducer