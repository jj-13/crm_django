import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogsPage } from '../api/blogs.api'

export const blogPages = createAsyncThunk(
    'blogs_pages',
    async (page) => {
        //console.log(userCredentials)   
        const response_api = await getBlogsPage(page)
        return response_api
    }
)

const blogPagesSlice = createSlice({
    name: 'blogs_pages',
    initialState:{ 
        rows:[],
        next:'',
        previous:'',
        count:0
    },
    extraReducers:(builder)=>{
        builder
        //list
        .addCase(blogPages.pending, (state)=>{
            console.log('blogPages entro pending')
            //state.token = null
        })
        .addCase(blogPages.fulfilled, (state, action)=>{
            console.log('blogPages entro fulfilled')
            state.rows = [...action.payload.data]
            state.next =  action.payload.next
            state.previous =  action.payload.previous
            state.count =  action.payload.count
        })
        .addCase(blogPages.rejected, (state, action)=>{
            console.log('blogPages entro rejected')
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

export default blogPagesSlice.reducer