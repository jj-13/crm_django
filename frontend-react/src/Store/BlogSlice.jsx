import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogs } from '../api/blogs.api'

export const blog = createAsyncThunk(
    'blogs',
    async () => {
        //console.log(userCredentials)   
        const response_api = await getBlogs()
        return response_api
    }
)

const blogSlice = createSlice({
    name: 'blogs',
    initialState:{ 
        rows: [],
        next: '',
        previous: ''
    },
    extraReducers:(builder)=>{
        builder
        //list
        .addCase(blog.pending, (state)=>{
            console.log('blog entro pending')
            //state.token = null
        })
        .addCase(blog.fulfilled, (state, action)=>{
            console.log('blog entro fulfilled')
            state.rows = [...action.payload.data]
            state.next =  action.payload.next
            state.previous =  action.payload.previous
        })
        .addCase(blog.rejected, (state, action)=>{
            console.log('blog entro rejected')
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

export default blogSlice.reducer