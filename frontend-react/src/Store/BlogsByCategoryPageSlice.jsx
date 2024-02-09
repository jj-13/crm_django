import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogsByCategoryPage } from '../api/blogs.api'

export const blogsByCategoryPage = createAsyncThunk(
    'blogs_by_categories_pages',
    async (result) => {
        //console.log(userCredentials)   
        const response_api = await getBlogsByCategoryPage(result)
        return response_api
    }
)

const blogsByCategoryPagesSlice = createSlice({
    name: 'blogs_by_categories_pages',
    initialState:{ 
        rows:[],
        next: '',
        previous: '',
        count:0
    },
    extraReducers:(builder)=>{
        builder
        //list
        .addCase(blogsByCategoryPage.pending, (state)=>{
            console.log('blogsByCategoryPage entro pending')
            //state.token = null
        })
        .addCase(blogsByCategoryPage.fulfilled, (state, action)=>{
            console.log('blogsByCategoryPage entro fulfilled')
            state.rows = [...action.payload.data]
            state.next =  action.payload.next
            state.previous =  action.payload.previous
            state.count =  action.payload.count
        })
        .addCase(blogsByCategoryPage.rejected, (state, action)=>{
            console.log('blogsByCategoryPage entro rejected')
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

export default blogsByCategoryPagesSlice.reducer