import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogsSearchPage } from '../api/blogs.api'

export const blogSearchPages = createAsyncThunk(
    'blogs_search_pages',
    async (search_term) => {
        //console.log(userCredentials)   
        const response_api = await getBlogsSearchPage(search_term)
        return response_api
    }
)

const blogSearchPagesSlice = createSlice({
    name: 'blogs_search_pages',
    initialState:{ 
        rows:[],
        next:'',
        previous:''
    },
    extraReducers:(builder)=>{
        builder
        //list
        .addCase(blogSearchPages.pending, (state)=>{
            console.log('blogSearchPages entro pending')
            //state.token = null
        })
        .addCase(blogSearchPages.fulfilled, (state, action)=>{
            console.log('blogSearchPages entro fulfilled')
            state.rows = [...action.payload.data]
            state.next =  action.payload.next
            state.previous =  action.payload.previous
        })
        .addCase(blogSearchPages.rejected, (state, action)=>{
            console.log('blogSearchPages entro rejected')
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

export default blogSearchPagesSlice.reducer