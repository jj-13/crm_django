import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogsDetail } from '../api/auth.api'

export const blogDetail = createAsyncThunk(
    'blog_detail',
    async (slug) => {
        //console.log(userCredentials)   
        const response_api = await getBlogsDetail(slug)
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
               
    }
})

export default blogDetailSlice.reducer