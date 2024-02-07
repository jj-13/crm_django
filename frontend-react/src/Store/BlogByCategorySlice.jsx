import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogsByCategory } from '../api/blogs.api'

export const blogsByCategory = createAsyncThunk(
    'blogs_by_categories',
    async (category_slug) => {
        //console.log(userCredentials)   
        const response_api = await getBlogsByCategory(category_slug)
        return response_api
    }
)

const blogsByCategorySlice = createSlice({
    name: 'blogs_by_categories',
    initialState:{ 
        rows:[],
        next: '',
        previous: ''
    },
    extraReducers:(builder)=>{
        builder
        //list
        .addCase(blogsByCategory.pending, (state)=>{
            console.log('blogs_by_categories entro pending')
            //state.token = null
        })
        .addCase(blogsByCategory.fulfilled, (state, action)=>{
            console.log('blogs_by_categories entro fulfilled')
            state.rows = [...action.payload.data]
            state.next =  action.payload.next
            state.previous =  action.payload.previous
        })
        .addCase(blogsByCategory.rejected, (state, action)=>{
            console.log('blogs_by_categories entro rejected')
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

export default blogsByCategorySlice.reducer